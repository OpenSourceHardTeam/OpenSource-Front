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
    console.log('[욕설 필터링] 클라이언트 사이드 모드 시작:', text);
    
    // 🔧 CORS/Mixed Content 문제 해결을 위해 임시로 클라이언트 사이드 필터링 사용
    const maskedText = advancedClientSideFilter(text);
    
    console.log('[욕설 필터링] 클라이언트 사이드 완료:', maskedText);
    
    return {
      original: text,
      masked: maskedText
    };
    
  } catch (error) {
    console.error('[욕설 필터링] 클라이언트 사이드 오류:', error);
    
    return {
      original: text,
      masked: text  // 오류 시 원본 그대로
    };
  }
};

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