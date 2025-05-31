import { authApiGet, authApiPost, authApiDelete } from "../../apiUtils";

// Book 인터페이스 추가
export interface Book {
    bookId: number;
    bookRank: number;
    bookImageUrl: string;
    bookTitle: string;
    bookAuthor: string;
    bookDescription: string;
    publisherName: string;
    publishDate: string;
    publisherReview: string;

}
// 채팅방 목록 조회
export interface ChatRoom {
    id: number;
    externalRoomId: string;
    topic: string;
    book: Book;
    totalParticipants: number;
    messageSequence: number;
    currentParticipants: number;
    messageCount: number;
    isArchived: boolean;
}

// 메시지 인터페이스
export interface Message {
  id: number;
  sender: string;
  message: string;
  time: string;
  isMine?: boolean; // 클라이언트에서 계산하는 속성
  senderId?: string;
}

// 채팅방 참여 요청 파라미터
export interface JoinChatRoomParams {
    userId: number;
    chatroomId: number;
}

// 채팅방 목록 응답
export interface ChatRoomsResponse {
    chatRooms: ChatRoom[];
    // 페이징 정보 등 추가..
}

// 채팅방 메시지 응답
export interface ChatMessageResponse {
    messages: Message[];
    // 추가 필드...
}
// 사용자 인터페이스
export interface User {
    id: number;
    email: string;
    name: string;
}

// 사용자 목록 응답
export interface ChatRoomUsersResponse {
    [index: number] : User;
}

// 존재 여부 응답
export type ExistsResponse = boolean | {exists: boolean};

// 메시지 전송 요청 파라미터
export interface SendMessageParams {
    content: string;
    roomId: number;
    senderId: string;
}

// 응답이 비어있음
export interface EmptyResponse {success: true}

// 채팅방 생성 요청
export interface CreateChatRoomParams {
    topic: string;
    bookId: number;
    bookArgumentId: number;
}

export interface CreateChatRoomResponse {
    roomId: number;
}

// 간소화된 채팅방 정보 인터페이스
export interface SimpleChatRoom {
    id: number;
    topic: string;
    bookId: number;
}

// 코드와 메시지가 포함된 응답
export interface ApiStatusResponse {
    code: number;
    message: string;
}

// 채팅방 참여 요청
export const JoinChatRoom = async (data: JoinChatRoomParams) => {
    return authApiPost<EmptyResponse, JoinChatRoomParams, null>(
        "/api/v1/user-chatroom",
        data
    );
};

// 사용자의 채팅방 목록 조회
export const getUserChatRooms = async (userId: number) => {
  console.log(`API 호출: /api/v1/user-chatroom/user/${userId}/chatrooms`);
  try {
    const response = await authApiGet<any, null>(
      `/api/v1/user-chatroom/user/${userId}/chatrooms`, 
      null
    );
    console.log("API 전체 응답:", response);
    return response;
  } catch (error) {
    console.error("getUserChatRooms 에러:", error);
    throw error;
  }
};

//  사용자의 모든 채팅방 삭제 API
export const deleteAllUserChatRooms = async (userId: number) => {
  return authApiDelete<EmptyResponse, null>(
    `/api/v1/user-chatroom/user/${userId}/chatrooms`,
    null
  );
};

// 특정 사용자의 특정 채팅방 정보 조회
export const getUserChatRoom = async ( userId: number, chatroomId: number) => {
    return authApiGet<ChatRoom, null> (
        `/api/v1/user-chatroom/user/${userId}/chatroom/${chatroomId}`,
        null
    );
};

// 사용자의 특정 채팅방 나가기
export const leaveChatRoom = async (userId: number, chatroomId: number) => {
    return authApiDelete<EmptyResponse, null> (
        `/api/v1/user-chatroom/user/${userId}/chatroom/${chatroomId}`,
        null
    );
};

// 사용자의 채팅방 존재 여부 확인
export const checkUserInChatRoom = async (chatroomId: number, userId: number) => {
    return authApiGet<ExistsResponse, null> (
        `'/api/v1/user-chatroom/chatrooms/${chatroomId}/users/${userId}/exists`,
        null
    );
};

// 특정 채팅방의 사용자 목록 조회
export const getChatRoomUsers = async ( chatroomId: number) => {
    return authApiGet<ChatRoomUsersResponse, null> (
        `/api/v1/user-chatroom/chatroom/${chatroomId}/users`,
        null
    );
};

// 특정 채팅방의 모든 사용자 삭제(관리자용)
export const deleteAllChatRoomUsers = async (chatroomId: number) => {
    return authApiDelete<EmptyResponse, null> (
        `/api/v1/user-chatroom/chatroom/${chatroomId}/users`,
        null
    );
};

// 채팅방 생성 API
export const createChatRoom = async ( data: CreateChatRoomParams) => {
    return authApiPost<CreateChatRoomResponse, CreateChatRoomParams, null> (
        "/api/v1/chatroom",
        data,
        null
    );
};

export const getChatRoom = async (chatroomId: number) => {
    return authApiGet<SimpleChatRoom, null> (
        `/api/v1/chatroom/${chatroomId}`,
        null
    );
};

// 특정 채팅방 삭제
export const deleteChatRoom = async ( chatroomId: number) => {
    return authApiDelete<ApiStatusResponse, null> (
        `/api/v1/chatroom/${chatroomId}`,
        null
    );
};

