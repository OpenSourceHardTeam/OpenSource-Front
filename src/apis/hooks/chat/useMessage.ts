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

// ✅ 욕설 필터링 API 함수 추가 (인증 헤더 포함)
export const filterProfanity = async (text: string): Promise<ProfanityFilterResponse> => {
  try {
    console.log('[욕설 필터링] API 호출 시작:', text);
    
    // 개발 환경에서는 프록시 사용, 운영 환경에서는 직접 호출
    const apiUrl = import.meta.env.DEV 
      ? '/api/profanity'  // 프록시 경로
      : 'http://3.34.186.27:8000/mask';  // 직접 경로
    
    console.log('[욕설 필터링] 사용할 URL:', apiUrl);
    
    // 🔑 인증 토큰 가져오기 (여러 가지 시도)
    const authToken = localStorage.getItem('accessToken') || 
                     import.meta.env.VITE_AUTH_TOKEN ||
                     import.meta.env.VITE_PROFANITY_API_KEY;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // 🔑 다양한 인증 헤더 방식 시도
    if (authToken) {
      // Bearer 토큰 방식
      headers['Authorization'] = `Bearer ${authToken}`;
      // API 키 방식들도 함께 시도
      headers['X-API-Key'] = authToken;
      headers['API-Key'] = authToken;
      headers['x-api-key'] = authToken;
      
      console.log('[욕설 필터링] 인증 토큰 사용:', authToken.substring(0, 10) + '...');
    } else {
      console.warn('[욕설 필터링] 인증 토큰이 없습니다');
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    });

    console.log('[욕설 필터링] 응답 상태:', response.status);

    if (!response.ok) {
      // 상세한 에러 정보 로깅
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[욕설 필터링] API 오류 상세:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      throw new Error(`욕설 필터링 API 오류: ${response.status} - ${response.statusText}`);
    }

    const result: ProfanityFilterResponse = await response.json();
    console.log('[욕설 필터링] API 응답 성공:', result);
    
    return result;
  } catch (error) {
    console.error('[욕설 필터링] API 호출 실패:', error);
    
    // 오류 발생 시 원본 텍스트 그대로 반환
    return {
      original: text,
      masked: text
    };
  }
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