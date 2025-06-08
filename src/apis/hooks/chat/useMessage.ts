import { authApiGet, authApiDelete, authApiPost } from "../../apiUtils";

// MessageDocumentDto 인터페이스 (Swagger 스키마 기준)
export interface MessageDocumentDto {
  id: number;
  chatroomId: number;
  senderId: number;
  content: string;
  timestamp: string; // ISO date-time string
}

// 메시지 개수 응답
export interface MessageCountResponse {
  count: number;
}

// 메시지 전송 요청 파라미터
export interface SendMessageRequest {
  chatroomId: number;
  senderId: number;
  content: string;
}

// ✅ 욕설 필터링 관련 인터페이스 추가
export interface ProfanityFilterRequest {
  text: string;
}

export interface ProfanityFilterResponse {
  original: string;
  masked: string;
}


// ✅ HTTPS 욕설 필터링 API 함수 (업데이트됨)
export const filterProfanity = async (text: string): Promise<ProfanityFilterResponse> => {
  try {
    console.log('[욕설 필터링] HTTPS API 호출 시작:', text);
    
    // 🔒 HTTPS 주소로 Mixed Content 문제 해결!
    const apiUrl = import.meta.env.DEV 
      ? '/api/profanity'  // 개발환경: Vite 프록시 사용
      : 'https://filter.opensourcebooking.xyz/mask';  // 운영환경: 직접 HTTPS 호출
    
    console.log('[욕설 필터링] 사용할 HTTPS URL:', apiUrl);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // 🔑 인증이 필요한 경우 토큰 추가
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
      console.log('[욕설 필터링] 인증 토큰 사용');
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    });

    console.log('[욕설 필터링] HTTPS 응답 상태:', response.status);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[욕설 필터링] HTTPS API 오류 상세:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // API 오류 시 클라이언트 사이드 필터링으로 대체
      console.log('[욕설 필터링] API 오류로 클라이언트 필터링 대체 사용');
      const maskedText = advancedClientSideFilter(text);
      
      return {
        original: text,
        masked: maskedText
      };
    }

    const result: ProfanityFilterResponse = await response.json();
    console.log('[욕설 필터링] HTTPS API 응답 성공:', result);
    
    return result;
    
  } catch (error) {
    console.error('[욕설 필터링] HTTPS API 호출 실패:', error);
    
    // 네트워크 오류 시 클라이언트 사이드 필터링으로 대체
    console.log('[욕설 필터링] 네트워크 오류로 클라이언트 필터링 대체 사용');
    const maskedText = advancedClientSideFilter(text);
    
    return {
      original: text,
      masked: maskedText
    };
  }
};

// 🛡️ 대체용 클라이언트 사이드 필터링 (API 오류 시 사용)
const advancedClientSideFilter = (text: string): string => {
  const profanityPatterns = [
    // 한국어 욕설
    { pattern: /시발/gi, replacement: '**' },
    { pattern: /씨발/gi, replacement: '**' },
    { pattern: /개새끼/gi, replacement: '***' },
    { pattern: /병신/gi, replacement: '**' },
    { pattern: /좆/gi, replacement: '*' },
    { pattern: /개같은/gi, replacement: '***' },
    { pattern: /개소리/gi, replacement: '***' },
    { pattern: /멍청이/gi, replacement: '***' },
    { pattern: /바보/gi, replacement: '**' },
    { pattern: /미친/gi, replacement: '**' },
    { pattern: /또라이/gi, replacement: '***' },
    { pattern: /새끼/gi, replacement: '**' },
    
    // 변형된 욕설들
    { pattern: /ㅅㅂ/gi, replacement: '**' },
    { pattern: /ㅂㅅ/gi, replacement: '**' },
    { pattern: /ㄱㅅㄲ/gi, replacement: '***' },
    { pattern: /시1발/gi, replacement: '***' },
    { pattern: /씨1발/gi, replacement: '***' },
    { pattern: /시@발/gi, replacement: '***' },
    { pattern: /씨@발/gi, replacement: '***' },
    
    // 영어 욕설
    { pattern: /fuck/gi, replacement: '****' },
    { pattern: /shit/gi, replacement: '****' },
    { pattern: /damn/gi, replacement: '****' },
    { pattern: /bitch/gi, replacement: '*****' },
  ];
  
  let filtered = text;
  
  profanityPatterns.forEach(({ pattern, replacement }) => {
    filtered = filtered.replace(pattern, replacement);
  });
  
  // 같은 문자 3개 이상 반복 필터링
  filtered = filtered.replace(/(.)\1{2,}/g, (match, char) => {
    const suspiciousChars = ['ㅅ', 'ㅂ', 'ㄱ', 'ㅆ', '!', '@', '#', '*'];
    if (suspiciousChars.includes(char)) {
      return '*'.repeat(Math.min(match.length, 3));
    }
    return match;
  });
  
  return filtered;
};

// 사용자별 메시지 조회
export const getMessagesBySender = async (senderId: number) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/sender/${senderId}`,
    null
  );
};

// 채팅방 메시지 전체 조회
export const getMessagesByChatroom = async (chatroomId: number) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}`,
    null
  );
};

// 채팅방 전체 메시지 삭제
export const deleteAllMessagesInChatroom = async (chatroomId: number) => {
  return authApiDelete<{ success: boolean }, null>(
    `/v1/api/messages/chatroom/${chatroomId}`,
    null
  );
};

// 채팅방 내 사용자 메시지 조회
export const getMessagesByChatroomAndSender = async (chatroomId: number, senderId: number) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}/sender/${senderId}`,
    null
  );
};

// 채팅방 내 사용자 메시지 삭제
export const deleteMessagesByChatroomAndSender = async (chatroomId: number, senderId: number) => {
  return authApiDelete<{ success: boolean }, null>(
    `/v1/api/messages/chatroom/${chatroomId}/sender/${senderId}`,
    null
  );
};

// 채팅방 메시지 검색
export const searchMessagesInChatroom = async (chatroomId: number, keyword: string) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}/search?keyword=${encodeURIComponent(keyword)}`,
    null
  );
};

// 채팅방 최신 메시지 조회
export const getRecentMessagesInChatroom = async (chatroomId: number) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}/recent`,
    null
  );
};

// 채팅방 최신 메시지 단건 조회
export const getLatestMessageInChatroom = async (chatroomId: number) => {
  return authApiGet<MessageDocumentDto, null>(
    `/v1/api/messages/chatroom/${chatroomId}/latest`,
    null
  );
};

// 채팅방 메시지 개수 조회
export const getMessageCountInChatroom = async (chatroomId: number) => {
  return authApiGet<MessageCountResponse, null>(
    `/v1/api/messages/chatroom/${chatroomId}/count`,
    null
  );
};

// 특정 시간 이전 메시지 조회
export const getMessagesBeforeTimestamp = async (chatroomId: number, timestamp: string) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}/before?timestamp=${encodeURIComponent(timestamp)}`,
    null
  );
};

// 특정 시간 이후 메시지 조회
export const getMessagesAfterTimestamp = async (chatroomId: number, timestamp: string) => {
  return authApiGet<MessageDocumentDto[], null>(
    `/v1/api/messages/chatroom/${chatroomId}/after?timestamp=${encodeURIComponent(timestamp)}`,
    null
  );
};

// 메시지 전송
export const sendMessage = async (chatroomId: number, content: string, senderId: number) => {
  const requestData: SendMessageRequest = {
    chatroomId,
    senderId,
    content
  };
    
  const response = await authApiPost<MessageDocumentDto, SendMessageRequest, null>(
    `/v1/api/messages`,
    requestData,
    null
  );
    
  return response.data; // 전송된 메시지 정보 반환
};