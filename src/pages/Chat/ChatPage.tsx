import React, { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from "react";
import * as styles from "./ChatPage.style";
import Button from "../../components/Button/Button";
import ChatRoomList from "../../components/ChatRoomList/ChatRoomList";
import { useLocation } from "react-router-dom";

// 🔥 기존 API와 타입 직접 import
import { getUserInfo } from "../../apis/userAPI";
import { UserInfo } from "../../apis/types/user";

import Line from "../../assets/img/Line.png";
import messageComponents from "../../assets/svg/messageClickButton.svg?url"

import {
  getUserChatRooms,
  getChatRoomUsers,
  leaveChatRoom,
  JoinChatRoom,
  ChatRoom,
  Message,
  User,
} from "../../apis/hooks/chat/useChatApi";

import {
  getMessagesByChatroom,
  MessageDocumentDto,
  filterProfanity,
} from "../../apis/hooks/chat/useMessage";

import { useWebSocket, RealtimeMessage, UserEvent } from "../../apis/hooks/chat/useWebSocket";
import { useBooks, BookData } from "../../apis/hooks/Books/useBooks";

// 🔥 JWT 토큰에서 userId 추출하는 함수
const getUserIdFromToken = (token: string): number | null => {
  try {
    // JWT는 보통 header.payload.signature 형태
    const payload = token.split('.')[1];
    if (!payload) return null;
    
    // Base64 디코딩
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    
    // 토큰에서 userId 추출 (다양한 필드명 시도)
    return parsedPayload.userId || 
           parsedPayload.sub || 
           parsedPayload.id || 
           parseInt(parsedPayload.userId) || 
           null;
  } catch (error) {
    console.error('JWT 토큰에서 userId 추출 실패:', error);
    return null;
  }
};

// 🔥 ChatPage에서 필요한 사용자 정보 (기존 UserInfo + userId)
interface ChatUserInfo extends UserInfo {
  userId: number;
}

// 🔥 확장된 ChatRoom 타입 정의
interface ChatRoomWithParticipants extends ChatRoom {
  actualParticipants?: number;
}

// 🔥 getChatRoomUsers용 Fallback 함수
const getChatRoomUsersWithFallback = async (chatroomId: number): Promise<User[]> => {
  try {
    const response = await getChatRoomUsers(chatroomId);
    if (Array.isArray(response)) {
      return response;
    } else if (response && typeof response === 'object') {
      return Object.values(response) as User[];
    }
    return [];
  } catch (error) {
    return [];
  }
};

// ======= 책 배열 인덱스 → 채팅방 ID 매핑 (110-159) =======
const getBookChatRoomId = (book: BookData, bookList: BookData[]): number => {
  const bookIndex = bookList.findIndex(b => b.bookId === book.bookId);
  const chatroomId = bookIndex + 110; // 110부터 시작
  
  if (bookIndex === -1) {
    return 110; // 기본값을 110으로 변경
  }
  
  return chatroomId;
};

// 🔥 새로 추가: 실제 참여자 수를 가져오는 훅
const useChatRoomsWithParticipants = (userId: number) => {
  const [chatRoomsWithParticipants, setChatRoomsWithParticipants] = useState<ChatRoomWithParticipants[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const participantsCache = useRef(new Map<number, number>()); // 캐싱

  const fetchParticipantCount = async (chatroomId: number): Promise<number> => {
    // 캐시에서 먼저 확인
    if (participantsCache.current.has(chatroomId)) {
      return participantsCache.current.get(chatroomId) || 0;
    }

    try {
      const users = await getChatRoomUsersWithFallback(chatroomId);
      const count = users.length;
      
      // 캐시에 저장 (5분간 유효)
      participantsCache.current.set(chatroomId, count);
      setTimeout(() => {
        participantsCache.current.delete(chatroomId);
      }, 5 * 60 * 1000);

      return count;
    } catch (error) {
      return 0;
    }
  };

  const fetchChatRoomsWithParticipants = async () => {
    setIsLoading(true);
    try {
      const chatRoomsResponse = await getUserChatRooms(userId);
      
      if (chatRoomsResponse && Array.isArray(chatRoomsResponse) && chatRoomsResponse.length > 0) {
        // 초기값으로 먼저 설정 (빠른 렌더링)
        const initialRooms: ChatRoomWithParticipants[] = chatRoomsResponse.map(room => ({
          ...room,
          actualParticipants: room?.currentParticipants || 0 // 초기값
        }));
        setChatRoomsWithParticipants(initialRooms);

        // 백그라운드에서 실제 참여자 수 가져오기
        chatRoomsResponse.forEach(async (room, index) => {
          const actualCount = await fetchParticipantCount(room.id);
          setChatRoomsWithParticipants(prev => 
            prev.map((prevRoom, prevIndex) => 
              prevIndex === index 
                ? { ...prevRoom, actualParticipants: actualCount }
                : prevRoom
            )
          );
        });

      } else {
        setChatRoomsWithParticipants([]);
      }
    } catch (error) {
      setChatRoomsWithParticipants([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatRoomsWithParticipants,
    isLoading,
    fetchChatRoomsWithParticipants
  };
};

const ChatPage: React.FC = () => {
  const location = useLocation();

  // 🔥 실제 사용자 정보 관리 (하드코딩 제거)
  const [currentUserInfo, setCurrentUserInfo] = useState<ChatUserInfo | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // const [authError, setAuthError] = useState<string | null>(null);

  // 🔥 자동 참여 중복 방지를 위한 ref 추가
  const autoJoinProcessed = useRef<boolean>(false);

  // 메시지 상태 관리
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔥 실제 userId 사용 (하드코딩 제거)
  const { chatRoomsWithParticipants, isLoading: isLoadingRooms, fetchChatRoomsWithParticipants } = 
    useChatRoomsWithParticipants(currentUserInfo?.userId || 0);

  // 채팅방 상태 관리
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
  const [roomMessages, setRoomMessages] = useState<{
    [key: number]: Message[];
  }>({});
  
  // 사용자 목록 상태
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 로딩 상태
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

  // 책 관련 상태
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  // 메시지 목록 자동 스크롤을 위한 ref
  const messageListRef = useRef<HTMLDivElement>(null);

  // useBooks 훅 사용
  const { bookList, loading: isLoadingBooks, error: booksError, refetch: refetchBooks } = useBooks();

  // 🔥 간단하게 JWT 토큰에서 userId 추출해서 사용자 정보 가져오기
  useEffect(() => {
    const initializeUserInfo = async () => {
      setIsAuthLoading(true);
      // setAuthError(null);

      try {
        console.log("🔍 사용자 정보 가져오기 시작...");

        // 1. 환경 변수 토큰을 localStorage에 저장 (기존 로직 유지)
        const envToken = import.meta.env.VITE_AUTH_TOKEN;
        if (envToken) {
          console.log("🔍 환경변수 토큰 발견");
          localStorage.setItem("accessToken", envToken);
        }

        // 2. 🔥 JWT 토큰에서 userId 추출
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("토큰이 없습니다.");
        }

        const userId = getUserIdFromToken(token);
        if (!userId) {
          throw new Error("토큰에서 사용자 ID를 추출할 수 없습니다.");
        }

        console.log("✅ 토큰에서 userId 추출 성공:", userId);

        // 3. 🔥 기존 getUserInfo API 호출
        const userInfoResponse = await getUserInfo();
        
        if (userInfoResponse && userInfoResponse.data) {
          console.log("✅ 서버에서 사용자 정보 가져오기 성공:", userInfoResponse.data);
          
          // ChatPage에서 필요한 형태로 변환
          const chatUserInfo: ChatUserInfo = {
            ...userInfoResponse.data,
            userId: userId // JWT 토큰에서 추출한 userId 사용
          };
          
          setCurrentUserInfo(chatUserInfo);
          
          // currentUser 상태도 업데이트 (기존 User 타입에 맞게)
          setCurrentUser({
            id: userId,
            email: userInfoResponse.data.email,
            name: userInfoResponse.data.name
          });

          console.log("✅ 사용자 정보 설정 완료:", chatUserInfo);
        } else {
          throw new Error("서버에서 사용자 정보를 가져올 수 없습니다.");
        }

      } catch (error) {
        
        // 🔄 개발용 폴백 (기존 하드코딩된 값 사용)
        const fallbackUser: ChatUserInfo = {
          userId: 6,
          name: "개발용 사용자",
          email: "dev@example.com"
        };
        
        setCurrentUserInfo(fallbackUser);
        setCurrentUser({
          id: 6,
          email: "dev@example.com",
          name: "개발용 사용자"
        });
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeUserInfo();
  }, []);

  // 🔥 사용자 정보가 로드된 후 자동 참여 처리
  useEffect(() => {
    // 인증 로딩 중이거나 사용자 정보가 없으면 대기
    if (isAuthLoading || !currentUserInfo) {
      return;
    }

    // 이미 처리했으면 무시
    if (autoJoinProcessed.current) {
      return;
    }

    // ChatingCard나 ChatRoomSection에서 전달받은 책 정보와 자동 참여 플래그 확인
    const state = location.state as { 
      selectedBook?: BookData; 
      autoJoin?: boolean 
    } | null;
    
    console.log("🔍 자동 참여 체크:", {
      hasState: !!state,
      hasSelectedBook: !!state?.selectedBook,
      hasAutoJoin: !!state?.autoJoin,
      bookListLength: bookList.length,
      alreadyProcessed: autoJoinProcessed.current,
      currentUserId: currentUserInfo.userId
    });
    
    // 조건: 책 정보 있음 + 자동 참여 플래그 있음 + 책 목록 로드 완료 + 아직 처리 안함
    if (state?.selectedBook && state?.autoJoin && bookList.length > 0) {
      console.log("✅ 자동 채팅방 참여 시작:", state.selectedBook.bookTitle);
      
      // 🚨 중복 방지: 처리했음을 표시
      autoJoinProcessed.current = true;
      
      // 자동으로 해당 책의 채팅방에 참여
      handleSelectBookWithValidation(state.selectedBook);
      
      // 한 번 처리한 후 state 초기화 (뒤로가기 시 중복 처리 방지)
      window.history.replaceState({}, document.title);
      
      console.log("✅ 자동 참여 처리 완료");
    }
  }, [bookList.length, currentUserInfo, isAuthLoading]);

  // 🔥 사용자 정보가 로드된 후 채팅방 목록 가져오기
  useEffect(() => {
    if (currentUserInfo?.userId) {
      fetchChatRoomsWithParticipants();
    }
  }, [currentUserInfo]);

  // ✅ 웹소켓 연결용 실제 사용자 이름 (입장 메시지에 표시될 이름)
  const getWebSocketUserName = (): string => {
    return currentUserInfo?.name || currentUser?.name || `User${currentUserInfo?.userId || 0}`;
  };

  // ✅ UI 표시용 실제 닉네임
  const getDisplayUserName = (): string => {
    return currentUser?.name || currentUserInfo?.name || "사용자";
  };

  // ✅ 에러 시 최소 폴백 데이터 (실제 사용자 정보 기반)
  const createFallbackUser = (id: number): User => ({
    id,
    email: `user${id}@example.com`,
    name: id === (currentUserInfo?.userId || 0) ? getDisplayUserName() : `사용자${id}`
  });

  // 동적 사용자 이름 가져오기 (웹소켓용으로 수정)
  const getCurrentUserName = (): string => {
    return getWebSocketUserName(); // 🔥 실제 사용자 이름 사용
  };

  // 웹소켓 연결 (실제 사용자 정보 사용)
  const {
    status: wsStatus,
    sendMessage: wsSendMessage,
    onMessage: onWsMessage,
    onUserEvent: onWsUserEvent,
    onSystemMessage: onWsSystemMessage,
  } = useWebSocket({
    chatroomId: activeRoomId,
    userId: currentUserInfo?.userId || 0, // 🔥 실제 userId 사용
    userName: getCurrentUserName(),
    enabled: !!activeRoomId && !!currentUserInfo // 🔥 사용자 정보가 있을 때만 웹소켓 연결
  });

  // 🔥 웹소켓 연결 시 전달되는 사용자 이름 디버깅
  useEffect(() => {
    if (currentUserInfo && activeRoomId) {
      const userName = getCurrentUserName();
      console.log("🔍 웹소켓에 전달되는 사용자 이름:", {
        userName,
        currentUserInfo: currentUserInfo,
        currentUser: currentUser,
        userId: currentUserInfo.userId
      });
    }
  }, [currentUserInfo, currentUser, activeRoomId]);

  // 메시지 목록 자동 스크롤
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===== 웹소켓 실시간 메시지 처리 (강화된 필터링) =====
  useEffect(() => {
    // 강화된 JSON 문자열 체크 함수
    const isJsonMessage = (data: any): boolean => {
      if (typeof data !== 'string') return false;
      
      const trimmed = data.trim();
      if (!trimmed) return false;
      
      // 1. JSON 구조 체크
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
          (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        return true;
      }
      
      // 2. 특정 JSON 패턴 체크
      const jsonPatterns = [
        /"type":\s*"(USER_JOIN|USER_LEAVE|MESSAGE|ERROR|SYSTEM)"/,
        /"chatroomId":\s*\d+/,
        /"userId":\s*\d+/,
        /"userName":\s*"/,
        /"data":\s*\{/,
        /^\{"type":/,
        /^\{.*"chatroomId":/,
        /^\{.*"data":/,
        /"USER_JOIN"/,
        /"USER_LEAVE"/,
        /"MESSAGE"/,
        /"ERROR"/,
        /"SYSTEM"/
      ];
      
      if (jsonPatterns.some(pattern => pattern.test(trimmed))) {
        return true;
      }
      
      // 3. JSON 파싱 시도로 최종 확인
      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed === 'object' && parsed !== null) {
          return true;
        }
      } catch (e) {
        // JSON이 아님
      }
      
      return false;
    };
    
    // 실시간 메시지 수신 처리
    onWsMessage((realtimeMessage: RealtimeMessage) => {
      // 🚫 JSON 문자열 완전 차단 - 1차 필터
      if (isJsonMessage(realtimeMessage)) {
        return;
      }
      
      // 🚫 string 타입 메시지 차단 - 2차 필터  
      if (typeof realtimeMessage === 'string') {
        return;
      }
      
      // 🚫 객체이지만 필수 필드가 없으면 차단 - 3차 필터
      if (!realtimeMessage.content || !realtimeMessage.senderId) {
        return;
      }
      
      // ✅ 정상 메시지만 처리
      if (realtimeMessage.chatroomId === activeRoomId) {
        try {
          const receivedMessage = convertToMessage(realtimeMessage);
          if (!receivedMessage) {
            return;
          }
          
          // 내가 방금 보낸 메시지인지 확인 (시간 기반 중복 방지)
          const isRecentMyMessage = realtimeMessage.senderId === (currentUserInfo?.userId || 0); // 🔥 변경
          
          setMessages(prevMessages => {
            // 중복 방지 로직
            const isDuplicate = prevMessages.some(msg => {
              return msg.content === receivedMessage.content && 
                     msg.senderId === receivedMessage.senderId;
            });
            
            if (isDuplicate) {
              return prevMessages;
            }
            
            // 내가 보낸 메시지는 이미 Optimistic Update로 표시했으므로 무시
            if (isRecentMyMessage) {
              return prevMessages;
            }
            
            const updatedMessages = [...prevMessages, receivedMessage];
            
            // 방별 메시지 저장소도 업데이트
            setRoomMessages(prev => ({
              ...prev,
              [activeRoomId!]: updatedMessages
            }));
            
            return updatedMessages;
          });
        } catch (convertError) {
          // 에러 무시
        }
      }
    });

    // 사용자 입장/퇴장 이벤트 처리 (강화된 필터링)
    onWsUserEvent((event: UserEvent) => {
      // 🚫 JSON 문자열 차단
      if (isJsonMessage(event)) {
        return;
      }
      
      // 🚫 string 타입 차단
      if (typeof event === 'string') {
        return;
      }
      
      // 🚫 필수 필드 확인
      if (!event.userId || !event.userName || !event.action) {
        return;
      }
      
      if (event.chatroomId === activeRoomId) {
        // 🔥 사용자 입장/퇴장 시 참여자 수 캐시 무효화 및 업데이트
        fetchRoomUsers(activeRoomId);
        fetchChatRoomsWithParticipants(); // 채팅방 목록의 참여자 수도 업데이트
        

        // 자신의 입장/퇴장은 시스템 메시지 표시 안함
        if (event.userId === (currentUserInfo?.userId || 0)) { // 🔥 변경
          return;
        }
        
        // 🔥 URL 디코딩된 사용자 이름 사용
        let decodedUserName = event.userName;
        try {
          // URL 인코딩된 한글 이름을 디코딩
          decodedUserName = decodeURIComponent(event.userName);
        } catch (error) {
          // 디코딩 실패 시 원본 사용
          decodedUserName = event.userName;
        }
        
        // 다른 사용자의 입장/퇴장만 시스템 메시지로 표시
        const systemMessage: Message = {
          id: Date.now() + Math.random(),
          senderId: -1, // 시스템 메시지는 -1로 처리
          chatroomId: activeRoomId,
          content: `${decodedUserName}님이 ${event.action === 'join' ? '입장' : '퇴장'}하셨습니다.`,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, systemMessage]);

      }
    });

    // 시스템 메시지 처리 (강화된 필터링)
    onWsSystemMessage((messageText: string) => {
      // 🚫 JSON 형태 완전 차단
      if (isJsonMessage(messageText)) {
        return;
      }
      
      // 🚫 빈 메시지나 의미없는 텍스트 차단
      if (!messageText || !messageText.trim() || messageText.trim().length < 2) {
        return;
      }
      
      if (activeRoomId) {
        // 🔥 URL 디코딩된 메시지 내용 사용
        let decodedMessage = messageText.trim();
        try {
          // URL 인코딩된 한글을 디코딩
          decodedMessage = decodeURIComponent(messageText.trim());
        } catch (error) {
          // 디코딩 실패 시 원본 사용
          decodedMessage = messageText.trim();
        }

        const systemMessage: Message = {
          id: Date.now() + Math.random(),
          senderId: -1, // 시스템 메시지는 -1로 처리
          chatroomId: activeRoomId,
          content: decodedMessage,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, systemMessage]);
      }
    });

  }, [activeRoomId, roomUsers, onWsMessage, onWsUserEvent, onWsSystemMessage, fetchChatRoomsWithParticipants, currentUserInfo?.userId]);

  // ===== 책 선택 및 채팅방 연결 (사용자 정보 가져오기 추가) =====
  
  // ✅ 수정된 책 선택 함수 - 사용자 정보 가져오기 포함
  const handleSelectBook = async (book: BookData) => {
    try {
      setSelectedBook(book);
      
      // 1. 책에 해당하는 고정 채팅방 ID 계산 (배열 인덱스 기반)
      const chatroomId = getBookChatRoomId(book, bookList);
      
      // 2. 해당 채팅방에 참여 시도 (실패해도 웹소켓 연결은 계속 진행)
      try {
        await JoinChatRoom({
          userId: currentUserInfo?.userId || 0, // 🔥 실제 userId 사용
          chatroomId: chatroomId
        });
      } catch (_) {
        // 모든 에러 무시하고 웹소켓 연결 계속 진행
      }
      
      // 3. 웹소켓 연결을 위한 채팅방 설정 (가장 중요!)
      setActiveRoomId(chatroomId);
      
      // 기존 메시지 초기화 (새로운 방으로 이동할 때)
      setMessages([]);
      
      // 4. 메시지와 사용자 목록은 실패해도 웹소켓은 작동
      fetchRoomMessages(chatroomId).catch(_ => {
        // 빈 메시지로 시작
        setMessages([]);
        setRoomMessages(prev => ({ ...prev, [chatroomId]: [] }));
      });
      
      fetchRoomUsers(chatroomId).catch(_ => {
        // 기본 사용자로 시작
        setRoomUsers([createFallbackUser(currentUserInfo?.userId || 0)]); // 🔥 변경
      });
      
      // 5. 채팅방 목록 갱신 (선택사항, 실패해도 무시)
      fetchChatRoomsWithParticipants().catch(_ => {
        // 무시
      });
      
    } catch (error) {
      alert(`책 선택 중 오류가 발생했습니다. 다시 시도해주세요.`);
    }
  };

  // MessageDocumentDto를 Message로 변환하는 함수 (수정됨)
  const convertToMessage = (dto: MessageDocumentDto | RealtimeMessage): Message | null => {
    let actualContent = dto.content;
    let actualSenderId = dto.senderId;
    
    // 🔍 JSON 형태인지 확인하고 data.content 추출
    if (dto.content && typeof dto.content === 'string' && dto.content.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(dto.content.trim());
        
        // type이 MESSAGE인 경우에만 처리
        if (parsed.type === 'MESSAGE' && parsed.data && parsed.data.content) {
          actualContent = parsed.data.content; // 🎯 실제 메시지 내용만 추출
          actualSenderId = parsed.data.senderId || dto.senderId; // senderId도 업데이트
        } else if (parsed.type && parsed.type !== 'MESSAGE') {
          // USER_JOIN, USER_LEAVE 등 시스템 메시지는 차단
          return null;
        }
      } catch (e) {
        // JSON 파싱 실패하면 원본 그대로 사용
      }
    }
    
    // 빈 내용이면 차단
    if (!actualContent || actualContent.trim().length === 0) {
      return null;
    }
    
    // 사용자 정보는 UI에서 별도 처리
    
    return {
      id: 'id' in dto ? dto.id : Date.now() + Math.random(),
      senderId: actualSenderId,
      chatroomId: 'chatroomId' in dto ? dto.chatroomId : activeRoomId || 0,
      content: actualContent.trim(), // 🎯 추출된 실제 내용만 표시
      timestamp: 'timestamp' in dto ? dto.timestamp : new Date().toISOString()
    };
  };

  // 유효성 검사를 포함한 책 선택 함수
  const handleSelectBookWithValidation = async (book: BookData) => {
    // 사용자 정보 확인
    if (!currentUserInfo?.userId) {
      alert("사용자 정보가 없습니다. 페이지를 새로고침해주세요.");
      return;
    }

    // 토큰 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 토큰을 확인해주세요.");
      return;
    }
    
    // 책 정보 유효성 검사
    if (!book || !book.bookId || !book.bookTitle) {
      alert("잘못된 책 정보입니다.");
      return;
    }
    
    // 실제 처리 함수 호출
    await handleSelectBook(book);
  };

  // ====== 메시지 가져오기 함수 (에러 처리 강화) ======
  const fetchRoomMessages = async (roomId: number) => {
    if (!roomId) {
      return;
    }

    setIsLoadingMessages(true);
    
    try {
      // 이미 가져온 메시지가 있다면 그것을 사용
      if (roomMessages[roomId] && roomMessages[roomId].length > 0) {
        setMessages(roomMessages[roomId]);
        setIsLoadingMessages(false);
        return;
      }

      const messageDtos = await getMessagesByChatroom(roomId);
      
      if (!Array.isArray(messageDtos)) {
        setMessages([]);
        setRoomMessages(prev => ({ ...prev, [roomId]: [] }));
        return;
      }
      
      // 현재 채팅방의 사용자 목록 가져오기 (이름 변환용)
      let currentUsers = roomUsers;
      if (currentUsers.length === 0) {
        try {
          const usersResponse = await getChatRoomUsers(roomId);
          currentUsers = Array.isArray(usersResponse) ? usersResponse : Object.values(usersResponse || {});
        } catch (userError) {
          currentUsers = [createFallbackUser(currentUserInfo?.userId || 0)]; // 🔥 변경
        }
      }
      
      // MessageDocumentDto를 Message로 변환
      const convertedMessages = messageDtos
        .map((dto) => {
          try {
            return convertToMessage(dto);
          } catch (_) {
            return null;
          }
        })
        .filter((message): message is Message => message !== null);
      
      setMessages(convertedMessages);
      setRoomMessages(prev => ({
        ...prev,
        [roomId]: convertedMessages
      }));
      
    } catch (error) {
      // 에러 시 빈 메시지 배열 (웹소켓으로는 계속 동작)
      setMessages([]);
      setRoomMessages(prev => ({
        ...prev,
        [roomId]: []
      }));
    } finally {
      setIsLoadingMessages(false);
    }
  };
  
  // 채팅방 사용자 목록 가져오기 (에러 처리 대폭 강화)
  const fetchRoomUsers = async (roomId: number) => {
    if (!roomId) {
      return;
    }
    
    setIsLoadingUsers(true);
    
    try {
      const response = await getChatRoomUsers(roomId);
      
      let users = [];
      
      if (Array.isArray(response)) {
        users = response;
      } else if (response && typeof response === 'object') {
        users = Object.values(response);
      } else {
        users = [createFallbackUser(currentUserInfo?.userId || 0)]; // 🔥 변경
      }
      
      if (users && users.length > 0) {
        setRoomUsers(users);
        
        // 🎯 현재 사용자 정보 업데이트 (roomUsers에서 찾은 경우)
        const currentUserInRoom = users.find(user => user.id === (currentUserInfo?.userId || 0)); // 🔥 변경
        if (currentUserInRoom) {
          setCurrentUser(currentUserInRoom);
        }
      } else {
        setRoomUsers([createFallbackUser(currentUserInfo?.userId || 0)]); // 🔥 변경
      }
    } catch (error) {
      // 어떤 에러든 기본 사용자로 설정 (웹소켓은 계속 작동)
      setRoomUsers([createFallbackUser(currentUserInfo?.userId || 0)]); // 🔥 변경
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // 🔥 roomId에서 해당하는 책을 찾는 헬퍼 함수 추가
  const getBookByRoomId = (roomId: number, bookList: BookData[]): BookData | null => {
    // roomId는 110부터 시작하므로, 110을 빼면 bookList의 인덱스가 됨
    const bookIndex = roomId - 110;
    
    if (bookIndex >= 0 && bookIndex < bookList.length) {
      return bookList[bookIndex];
    }
    
    return null;
  };

  // 🔥 수정된 방 선택 핸들러
  const handleSelectRoom = (roomId: number) => {
    if (roomId === activeRoomId) return;
    
    setActiveRoomId(roomId);
    
    // 🔥 roomId에 해당하는 책 정보 찾아서 selectedBook 업데이트
    const correspondingBook = getBookByRoomId(roomId, bookList);
    if (correspondingBook) {
      setSelectedBook(correspondingBook);
    } else {
      // 책 정보를 찾을 수 없는 경우, 채팅방 정보에서 책 제목 추출 시도
      const activeRoom = chatRoomsWithParticipants.find(room => room.id === roomId);
      if (activeRoom?.book) {
        // chatRoom에 book 정보가 있다면 해당 정보로 selectedBook 설정
        // 만약 book 정보가 BookData 형태가 아니라면 적절히 변환 필요
        setSelectedBook(null); // 또는 activeRoom.book 정보를 BookData 형태로 변환
      } else {
        setSelectedBook(null);
      }
    }
    
    setMessages([]); // 방 변경 시 메시지 초기화
    fetchRoomMessages(roomId);
    fetchRoomUsers(roomId);
  };

  // 채팅방 나가기 처리
  const handleLeaveRoom = async () => {
    if (!activeRoomId) return;
    
    if (!window.confirm("정말 채팅방을 나가시겠습니까?")) {
      return;
    }
    
    try {
      await leaveChatRoom(currentUserInfo?.userId || 0, activeRoomId); // 🔥 변경
      
      // 🔥 채팅방 목록 새로고침
      await fetchChatRoomsWithParticipants();
      
      // 다른 방 선택
      const newRooms = chatRoomsWithParticipants.filter(room => room.id !== activeRoomId);
      if (newRooms.length > 0) {
        setActiveRoomId(newRooms[0].id);
        fetchRoomMessages(newRooms[0].id);
        fetchRoomUsers(newRooms[0].id);
      } else {
        setActiveRoomId(null);
        setMessages([]);
        setRoomUsers([]);
        setSelectedBook(null);
      }
      
      alert("채팅방에서 나갔습니다.");
    } catch (error) {
      alert("채팅방 나가기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 메시지 전송 처리 (Optimistic Update + 웹소켓)
  const handleSendMessage = async (): Promise<void> => {
    if (message.trim() === "" || !activeRoomId) {
      return;
    }

    const originalMessage = message.trim();
    
    // 메시지 입력창 먼저 초기화 (UX 개선)
    setMessage("");

    try {
      const filterResult = await filterProfanity(originalMessage);

      const filteredMessage = filterResult.masked;
      
      // 1. 즉시 UI에 메시지 표시 (Optimistic Update)
      const newMessage: Message = {
        id: Date.now() + Math.random(),
        senderId: currentUserInfo?.userId || 0, // 🔥 변경
        chatroomId: activeRoomId,
        content: filteredMessage,
        timestamp: new Date().toISOString()
      };
      
      // 즉시 messages 배열에 추가
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        
        // 방별 메시지 저장소에도 저장
        setRoomMessages(prev => ({
          ...prev,
          [activeRoomId!]: updatedMessages
        }));
        
        return updatedMessages;
      });
      
      // ✅ 4. 웹소켓으로 필터링된 메시지 서버에 전송
      if (wsStatus === 'connected') {
        wsSendMessage(filteredMessage); // 🔥 필터링된 메시지 전송
      }
    } catch (filterError) {
      // ✅ 욕설 필터링 실패 시 원본 메시지 그대로 처리 (fallback)
      
      // 즉시 UI에 원본 메시지 표시
      const fallbackMessage: Message = {
        id: Date.now() + Math.random(),
        senderId: currentUserInfo?.userId || 0, // 🔥 변경
        chatroomId: activeRoomId,
        content: originalMessage, // 원본 메시지 사용
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, fallbackMessage];
        setRoomMessages(prev => ({
          ...prev,
          [activeRoomId!]: updatedMessages
        }));
        return updatedMessages;
      });

      // 웹소켓으로 원본 메시지 전송
      if (wsStatus === 'connected') {
        wsSendMessage(originalMessage);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  // 🔥 수정된 활성화된 방 정보 가져오기
  const activeRoom = chatRoomsWithParticipants.find((room) => room.id === activeRoomId);

  // Message 표시용 헬퍼 함수들
  const getMessageSender = (msg: Message): string => {
    if (msg.senderId === -1) return "시스템"; // 시스템 메시지는 -1
    if (msg.senderId === (currentUserInfo?.userId || 0)) return "나"; // 🔥 변경
    
    const user = roomUsers.find(u => u.id === msg.senderId);
    return user?.name || `사용자${msg.senderId}`;
  };

  const getMessageTime = (msg: Message): string => {
    try {
      const date = new Date(msg.timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "방금";
    }
  };

  const isMyMessage = (msg: Message): boolean => {
    return msg.senderId === (currentUserInfo?.userId || 0); // 🔥 변경
  };

  // ===== 책 목록 컴포넌트 =====
  const BookList: React.FC = () => (
    <div css={styles.BookListContainer}>
      <h3 css={styles.HeaderText}>
        도서 목록
      </h3>
      <img css={styles.lineStyle} src={Line} alt="구분선" />
      
      {booksError && (
        <div css={styles.ErrorBooks}>
          책 목록 로드 실패: {booksError}
          <button onClick={refetchBooks} css={styles.RetryButton}>
            다시 시도
          </button>
        </div>
      )}
      
      {isLoadingBooks ? (
        <div css={styles.LoadingBooks}>도서 목록을 불러오는 중...</div>
      ) : bookList.length === 0 ? (
        <div css={styles.EmptyBooks}>등록된 도서가 없습니다.</div>
      ) : (
        <div css={styles.BookItems}>
          {bookList.map((book) => (
            <div 
              key={book.bookId} 
              css={[
                styles.BookItem,
                selectedBook?.bookId === book.bookId && styles.BookItemSelected
              ]}
              onClick={() => handleSelectBookWithValidation(book)}
            >
              <img 
                src={book.bookImageUrl} 
                alt={book.bookTitle}
                css={styles.BookImage}
                onError={(e) => {
                  e.currentTarget.src = "/assets/img/default-book.png";
                }}
              />
              <div css={styles.BookInfo}>
                <div css={styles.BookTitle}>{book.bookTitle}</div>
                <div css={styles.BookAuthor}>{book.bookAuthor}</div>
                <div css={styles.BookRank}>#{book.bookRank}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 🔥 로딩 중일 때 UI
  if (isAuthLoading) {
    return (
      <div css={styles.PageContainer}>
        <div css={styles.ContentContainer}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            fontSize: '18px',
            color: '#666'
          }}>
            <div>
              <div>사용자 정보를 확인하는 중...</div>
              <div style={{ fontSize: '14px', marginTop: '10px' }}>
                JWT 토큰에서 사용자 정보를 추출하고 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div css={styles.PageContainer}>
      <div css={styles.ContentContainer}>
        <div css={styles.SidebarLeft}>
          <BookList />

          <ChatRoomList
            rooms={(chatRoomsWithParticipants || []).map(room => ({
              id: room?.id || 0,
              title: room?.topic || "제목 없음",
              category: room?.book?.bookTitle || "분류 없음",
              participants: room?.actualParticipants || room?.currentParticipants || 0, // 🔥 실제 참여자 수 사용!
              isActive: !room?.isArchived
            }))}
            onSelectRoom={handleSelectRoom}
            activeRoomId={activeRoomId || undefined}
            isLoading={isLoadingRooms}
          />
        </div>

        <div css={styles.ChatContainer}>
          <div css={styles.ChatHeader}>
            <span>
              {selectedBook 
                ? `📚 ${selectedBook.bookTitle} 토론방` 
                : activeRoom?.topic || "채팅방을 선택해주세요"
              }
            </span>
            {activeRoomId && currentUserInfo && (
              <div>
                {wsStatus === 'connected' && <span>● 연결됨</span>}
                {wsStatus === 'connecting' && <span>● 연결 중...</span>}
                {wsStatus === 'disconnected' && <span>● 연결 끊김</span>}
                {wsStatus === 'error' && <span>● 연결 오류</span>}
                <span>({getDisplayUserName()})</span>
              </div>
            )}
          </div>

          {/* 🔥 수정된 ChatAnnouncement 부분 */}
          <div css={styles.ChatAnnouncement}>
            {activeRoomId
              ? (() => {
                  // 1. selectedBook이 있으면 해당 책 이름 사용
                  if (selectedBook) {
                    return `"${selectedBook.bookTitle}" 토론방에 입장하신 것을 환영합니다! 🎉`;
                  }
                  
                  // 2. activeRoom에서 책 정보 추출 시도
                  const activeRoom = chatRoomsWithParticipants.find(room => room.id === activeRoomId);
                  if (activeRoom?.book?.bookTitle) {
                    return `"${activeRoom.book.bookTitle}" 토론방에 입장하신 것을 환영합니다! 🎉`;
                  }
                  
                  // 3. activeRoom의 topic 사용
                  if (activeRoom?.topic) {
                    return `"${activeRoom.topic}" 채팅방에 입장하신 것을 환영합니다! 🎉`;
                  }
                  
                  // 4. roomId에서 책 찾기 시도 (110부터 시작하는 규칙 이용)
                  const bookIndex = activeRoomId - 110;
                  if (bookIndex >= 0 && bookIndex < bookList.length) {
                    const book = bookList[bookIndex];
                    return `"${book.bookTitle}" 토론방에 입장하신 것을 환영합니다! 🎉`;
                  }
                  
                  // 5. 기본 메시지
                  return "채팅방에 입장하신 것을 환영합니다! 🎉";
                })()
              : "왼쪽에서 책을 선택하거나 채팅방을 클릭해주세요"
            }
            {activeRoomId && wsStatus !== 'connected' && (
              <div>
                📡 연결 상태: {wsStatus} - 연결 중이므로 잠시 기다려주세요
              </div>
            )}
          </div>

          <div css={styles.MessageList} ref={messageListRef}>
            {isLoadingMessages ? (
              <div css={styles.LoadingMessages}>메시지를 불러오는 중...</div>
            ) : (messages || []).length === 0 ? (
              <div css={styles.EmptyMessages}>
                아직 메시지가 없습니다. 첫 메시지를 보내보세요! 💬
                {activeRoomId && wsStatus === 'connected' && (
                  <div>실시간 채팅이 준비되었습니다 ✨</div>
                )}
              </div>
            ) : (
              (messages || []).map((msg) => (
                <div key={msg?.id || Math.random()} css={styles.MessageGroup}>
                  <div css={styles.MessageHeader}>
                    <span
                      css={
                        isMyMessage(msg)
                          ? styles.MessageSenderMine
                          : styles.MessageSender
                      }
                    >
                      {getMessageSender(msg)}
                    </span>
                    <span css={styles.MessageTime}>{getMessageTime(msg)}</span>
                  </div>
                  <div
                    css={
                      isMyMessage(msg)
                        ? styles.MessageBubbleMine
                        : styles.MessageBubble
                    }
                  >
                    {msg?.content || ""}
                  </div>
                </div>
              ))
            )}
          </div>

          <div css={styles.MessageInputContainer}>
            <input
              css={styles.MessageInputField}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                !activeRoomId 
                  ? "채팅방을 선택해주세요..." 
                  : wsStatus === 'connected' 
                    ? "메시지를 입력하세요..."
                    : wsStatus === 'connecting'
                      ? "연결 중..."
                      : "연결이 필요합니다"
              }
              disabled={!activeRoomId || wsStatus !== 'connected'}
            />
            <button
              css={styles.SendButton}
              onClick={handleSendMessage}
              disabled={!activeRoomId || wsStatus !== 'connected'}
            >
              <img 
                src={messageComponents} 
                alt="전송" 
              />
            </button>
          </div>
        </div>

        <div css={styles.SidebarRight}>
          <Button
            css={styles.LeaveButton}
            text={"채팅방 나가기"}
            type={"leave"}
            onClick={handleLeaveRoom}
            disabled={!activeRoomId}
          />

          <div css={styles.ParticipantList}>
            <h3 css={styles.HeaderText}>
              참여자 ({(roomUsers || []).length})
              {wsStatus === 'connected' && <span>🟢</span>}
            </h3>
            <img css={styles.lineStyle} src={Line} alt="구분선" />
            
            {isLoadingUsers ? (
              <div>참여자 목록을 불러오는 중...</div>
            ) : activeRoomId && (roomUsers || []).length > 0 ? (
              (roomUsers || []).map(user => (
                <div key={user?.id || Math.random()} css={styles.ParticipantItem}>
                  <div css={styles.ParticipantDot}></div> 
                  {user?.id === (currentUserInfo?.userId || 0) ? `${getDisplayUserName()} (나)` : (user?.name || "알 수 없음")} {/* 🔥 변경 */}
                </div>
              ))
            ) : (
              !activeRoomId ? (
                <div css={styles.EmptyParticipants}>
                  참여 중인 채팅방이 없습니다.
                </div>
              ) : (
                <div css={styles.EmptyParticipants}>
                  {wsStatus === 'connected' 
                    ? "실시간 연결됨 - 참여자 정보 로딩 중..."
                    : "참여자 정보를 불러오는 중..."
                  }
                </div>
              )
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ChatPage;