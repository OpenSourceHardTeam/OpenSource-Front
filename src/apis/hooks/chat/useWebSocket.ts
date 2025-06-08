import { useEffect, useRef, useState, useCallback } from 'react';
import { MessageDocumentDto } from './useMessage';

// 웹소켓 메시지 타입 정의
export interface WebSocketMessage {
  type: 'MESSAGE' | 'USER_JOIN' | 'USER_LEAVE' | 'ERROR' | 'SYSTEM';
  chatroomId: number;
  data: any;
  timestamp?: string;
}

// 실시간 메시지 데이터
export interface RealtimeMessage extends MessageDocumentDto {
  // 추가 실시간 속성이 있다면 여기에
}

// 사용자 입장/퇴장 이벤트 데이터

// export interface UserEvent {
//   userId: number;
//   userName: string;
//   chatroomId: number;
//   action: 'join' | 'leave';
// }


// 웹소켓 연결 상태
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseWebSocketProps {
  chatroomId: number | null;
  userId: number;
  userName?: string;
  enabled?: boolean;
}

interface UseWebSocketReturn {
  status: WebSocketStatus;
  sendMessage: (message: string) => void;
  onMessage: (callback: (message: RealtimeMessage) => void) => void;
  onUserEvent: (callback: (event: UserEvent) => void) => void;
  onSystemMessage: (callback: (message: string) => void) => void;
  disconnect: () => void;
  reconnect: () => void;
}

// 프록시를 통한 WebSocket URL 생성

const getWebSocketUrl = (chatroomId: number, userId: number, userName: string): string => {
  const token = localStorage.getItem('accessToken');
  
  const params = new URLSearchParams({
    token: token || '',
    userId: userId.toString(),
    chatRoomId: chatroomId.toString(),
    name: encodeURIComponent(userName)
  });

  let wsUrl: string;
  
  if (import.meta.env.DEV) {
    // 개발환경: 기존 Vite 프록시 방식 유지
    wsUrl = `ws://localhost:5173/ws-proxy?${params}`;
  } else {
    // ✅ 운영환경: 백엔드가 Query Parameter 지원하므로 직접 연결
    wsUrl = `wss://opensourcebooking.xyz/ws-booking-messaging?${params}`;
  }
  
  console.log('🔗 WebSocket URL (백엔드 수정 후):', wsUrl);
  return wsUrl;
};

// 🚫 개선된 JSON 메시지 완전 차단 함수
const isJsonMessage = (data: any): boolean => {
  if (typeof data !== 'string') return false;
  
  const trimmedData = data.trim();
  
  // 빈 문자열은 JSON이 아님
  if (!trimmedData) return false;
  
  // 1. 기본 JSON 구조 체크 - { 로 시작하고 } 로 끝남
  if (trimmedData.startsWith('{') && trimmedData.endsWith('}')) {
    console.log('🔍 [JSON 검사] 기본 JSON 구조 감지:', trimmedData.substring(0, 50) + '...');
    return true;
  }
  
  // 2. WebSocket 메시지 특정 패턴들
  const jsonPatterns = [
    /"type"\s*:\s*"(MESSAGE|USER_JOIN|USER_LEAVE|ERROR|SYSTEM)"/,  // type 필드
    /"chatroomId"\s*:\s*\d+/,                                      // chatroomId 필드
    /"data"\s*:\s*\{/,                                             // data 객체
    /"userId"\s*:\s*\d+/,                                          // userId 필드
    /"senderId"\s*:\s*\d+/,                                        // senderId 필드
    /"content"\s*:\s*"/,                                           // content 필드
    /"userName"\s*:\s*"/,                                          // userName 필드
  ];
  
  const hasJsonPattern = jsonPatterns.some(pattern => pattern.test(trimmedData));
  
  if (hasJsonPattern) {
    console.log('🔍 [JSON 검사] WebSocket JSON 패턴 감지:', trimmedData.substring(0, 50) + '...');
    return true;
  }
  
  // 3. JSON 파싱 시도로 최종 확인
  try {
    const parsed = JSON.parse(trimmedData);
    if (typeof parsed === 'object' && parsed !== null) {
      console.log('🔍 [JSON 검사] 파싱 가능한 JSON 객체 감지');
      return true;
    }
  } catch (e) {
    // JSON이 아님
  }
  
  return false;
};

// 🚫 에러 메시지 차단 함수
const isErrorMessage = (data: any): boolean => {
  if (typeof data !== 'string') return false;
  
  const errorPatterns = [
    /Error:/i,
    /Missing required headers/i,
    /Failed to/i,
    /Exception/i,
    /^\s*error\s*$/i,
    /Connection refused/i,
    /Timeout/i
  ];
  
  return errorPatterns.some(pattern => pattern.test(data));
};

// 🚫 의미없는 메시지 차단 함수
const isIgnorableMessage = (data: any): boolean => {
  if (typeof data !== 'string') return false;
  
  const trimmedData = data.trim();
  
  // 빈 문자열이나 너무 짧은 메시지
  if (!trimmedData || trimmedData.length < 2) {
    return true;
  }
  
  // 숫자만 있는 메시지
  if (/^\d+$/.test(trimmedData)) {
    return true;
  }
  
  // 특수문자만 있는 메시지
  if (/^[^a-zA-Z0-9가-힣]+$/.test(trimmedData)) {
    return true;
  }
  
  return false;
};

export const useWebSocket = ({ 
  chatroomId, 
  userId, 
  userName = '사용자',
  enabled = true 
}: UseWebSocketProps): UseWebSocketReturn => {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;
  
  const messageCallbackRef = useRef<((message: RealtimeMessage) => void) | null>(null);
  const userEventCallbackRef = useRef<((event: UserEvent) => void) | null>(null);
  const systemMessageCallbackRef = useRef<((message: string) => void) | null>(null);

  // 재연결 로직
  const reconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error('[WebSocket] 최대 재연결 시도 횟수 초과');
      setStatus('error');
      return;
    }
    
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      if (wsRef.current?.readyState !== WebSocket.OPEN && chatroomId && enabled) {
        console.log(`[WebSocket] 재연결 시도 ${reconnectAttempts.current + 1}/${maxReconnectAttempts}...`);
        reconnectAttempts.current++;
        connect();
      }
    }, delay);
  }, [chatroomId, enabled]);

  // 웹소켓 연결 함수
  const connect = useCallback(() => {
    if (!chatroomId || !enabled) {
      console.log('[WebSocket] 연결 조건 미충족');
      return;
    }

    // 기존 연결이 있으면 정리
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      const wsUrl = getWebSocketUrl(chatroomId, userId, userName);
      console.log(`[WebSocket] 연결 시도: ${wsUrl}`);
      
      setStatus('connecting');
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(`✅ [WebSocket] 연결 성공 - 채팅방 ${chatroomId}`);
        setStatus('connected');
        reconnectAttempts.current = 0;
        
        // 연결 성공 후 입장 메시지 전송

        // const joinMessage: WebSocketMessage = {
        //   type: 'USER_JOIN',
        //   chatroomId,
        //   data: { 
        //     userId,
        //     userName
        //   }
        // };
        
        // console.log('📤 입장 메시지 전송:', joinMessage);
        // ws.send(JSON.stringify(joinMessage));

      };

      ws.onmessage = (event) => {
        try {
          console.log('📥 Raw WebSocket 메시지:', event.data);
          
          // 🚫 강화된 1차 필터링: JSON 형태의 원본 메시지 완전 차단
          if (isJsonMessage(event.data)) {
            console.log('🚫 [1차 차단] JSON 메시지 내부 처리만 수행, UI 전달 차단:', event.data);
            
            // JSON 메시지는 내부 처리만 하고 UI에는 절대 전달하지 않음
            try {
              const wsMessage: WebSocketMessage = JSON.parse(event.data);
              console.log('🔄 [내부 처리] 파싱된 메시지:', wsMessage);
              
              // 내부적으로만 처리 - UI에는 전달하지 않음
              switch (wsMessage.type) {
                case 'MESSAGE':
                  if (messageCallbackRef.current && wsMessage.data) {
                    const realtimeMessage: RealtimeMessage = {
                      id: wsMessage.data.id || Date.now(),
                      chatroomId: wsMessage.chatroomId,
                      senderId: wsMessage.data.senderId || wsMessage.data.userId,
                      content: wsMessage.data.content || wsMessage.data.message,
                      timestamp: wsMessage.data.createdAt || new Date().toISOString(),
                    };
                    console.log('💬 [내부 처리] 메시지 콜백 호출:', realtimeMessage);
                    messageCallbackRef.current(realtimeMessage);
                  }
                  break;
                  
                case 'USER_JOIN':
                case 'USER_LEAVE':

                  // if (userEventCallbackRef.current && wsMessage.data) {
                  //   const userEvent: UserEvent = {
                  //     userId: wsMessage.data.userId,
                  //     userName: wsMessage.data.userName || wsMessage.data.name || '알 수 없음',
                  //     chatroomId: wsMessage.chatroomId,
                  //     action: wsMessage.type === 'USER_JOIN' ? 'join' : 'leave'
                  //   };
                  //   console.log('👤 [내부 처리] 사용자 이벤트 콜백 호출:', userEvent);
                  //   userEventCallbackRef.current(userEvent);
                  // }
                  // break;
                  
                // case 'SYSTEM':
                //   // 시스템 메시지도 JSON 형태라면 내부 처리만
                //   console.log('🔧 [내부 처리] 시스템 메시지 (JSON 형태) 처리됨, UI 전달 안함');
                //   break;
                  
                // case 'ERROR':
                //   console.error('[WebSocket] 서버 에러:', wsMessage.data);
                //   break;

              }
            } catch (parseError) {
              console.warn('[WebSocket] JSON 파싱 실패 (내부 처리 건너뜀):', parseError);
            }
            
            // 🚫 JSON 메시지는 여기서 완전 차단 - UI에 절대 전달하지 않음
            return;
          }
          
          // 🚫 2차 필터링: 에러 메시지 차단
          if (isErrorMessage(event.data)) {
            console.log('🚫 [2차 차단] 에러 메시지 차단:', event.data);
            return;
          }
          
          // 🚫 3차 필터링: 의미없는 메시지 차단
          if (isIgnorableMessage(event.data)) {
            console.log('🚫 [3차 차단] 의미없는 메시지 차단:', event.data);
            return;
          }
          
          // ✅ 순수 텍스트 메시지만 시스템 메시지로 처리
          console.log('✅ [허용] 순수 텍스트 메시지를 시스템 메시지로 처리:', event.data);
          if (systemMessageCallbackRef.current) {
            systemMessageCallbackRef.current(event.data.trim());
          }
          
        } catch (error) {
          console.error('[WebSocket] 메시지 처리 에러:', error);
        }
      };

      ws.onclose = (event) => {
        console.log(`🔌 [WebSocket] 연결 종료 - 코드: ${event.code}, 이유: ${event.reason}`);
        setStatus('disconnected');
        
        // 비정상 종료인 경우 재연결 시도
        if (event.code !== 1000 && enabled && reconnectAttempts.current < maxReconnectAttempts) {
          console.log('🔄 [WebSocket] 비정상 종료 - 재연결 시도');
          reconnect();
        }
      };

      ws.onerror = (error) => {
        console.error('❌ [WebSocket] 연결 에러:', error);
        setStatus('error');
      };

    } catch (error) {
      console.error('❌ [WebSocket] 연결 생성 실패:', error);
      setStatus('error');
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnect();
      }
    }
  }, [chatroomId, userId, userName, enabled, reconnect]);

  // 메시지 전송 함수
  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && chatroomId) {
      const wsMessage: WebSocketMessage = {
        type: 'MESSAGE',
        chatroomId,
        data: {
          content: message,
          senderId: userId,
          senderName: userName
        }
      };
      
      console.log('📤 [WebSocket] 메시지 전송:', wsMessage);
      wsRef.current.send(JSON.stringify(wsMessage));
    } else {
      console.warn('⚠️ [WebSocket] 메시지 전송 실패 - 연결되지 않음');
    }
  }, [chatroomId, userId, userName]);

  // 연결 해제 함수
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    reconnectAttempts.current = 0;
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {

      // const leaveMessage: WebSocketMessage = {
      //   type: 'USER_LEAVE',
      //   chatroomId: chatroomId || 0,
      //   data: { 
      //     userId,
      //     userName
      //   }
      // };
      
      // console.log('📤 퇴장 메시지 전송:', leaveMessage);
      // wsRef.current.send(JSON.stringify(leaveMessage));

      
      // 정상 종료 코드로 연결 해제
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }
    
    setStatus('disconnected');
  }, [chatroomId, userId, userName]);

  // 수동 재연결 함수
  const manualReconnect = useCallback(() => {
    reconnectAttempts.current = 0;
    disconnect();
    setTimeout(() => {
      if (chatroomId && enabled) {
        connect();
      }
    }, 1000);
  }, [chatroomId, enabled, connect, disconnect]);

  // 콜백 함수 등록
  const onMessage = useCallback((callback: (message: RealtimeMessage) => void) => {
    messageCallbackRef.current = callback;
  }, []);

  const onUserEvent = useCallback((callback: (event: UserEvent) => void) => {
    userEventCallbackRef.current = callback;
  }, []);

  const onSystemMessage = useCallback((callback: (message: string) => void) => {
    systemMessageCallbackRef.current = callback;
  }, []);

  // 채팅방 변경 시 연결/재연결
  useEffect(() => {
    if (chatroomId && enabled) {
      connect();
    } else {
      disconnect();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      disconnect();
    };
  }, [chatroomId, enabled, connect, disconnect]);

  return {
    status,
    sendMessage,
    onMessage,
    onUserEvent,
    onSystemMessage,
    disconnect,
    reconnect: manualReconnect
  };
};