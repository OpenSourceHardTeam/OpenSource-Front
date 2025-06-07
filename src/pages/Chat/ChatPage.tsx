import React, { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from "react";
import * as styles from "./ChatPage.style";
import Button from "../../components/Button/Button";
import ChatRoomList from "../../components/ChatRoomList/ChatRoomList";
import InfoBoxWithTimers from "../../components/InfoBoxWithTimer/InfoBoxWithTimer";

// import Arrow from "../../assets/svg/book-info-link.svg";
import Line from "../../assets/img/Line.png";
import messageComponents from "../../assets/svg/messageClickButton.svg?url"

// API 함수들과 타입 임포트
import {
  getUserChatRooms,
  getChatRoomUsers,
  leaveChatRoom,
  JoinChatRoom,
  ChatRoom,
  Message,
  User,
} from "../../apis/hooks/chat/useChatApi";

// 새로운 메시지 API 임포트
import {
  getMessagesByChatroom,
  MessageDocumentDto,
  filterProfanity,
} from "../../apis/hooks/chat/useMessage";

// 웹소켓 훅 임포트
import { useWebSocket, RealtimeMessage, UserEvent } from "../../apis/hooks/chat/useWebSocket";

// 책 관련 훅 임포트
import { useBooks, BookData } from "../../apis/hooks/Books/useBooks";

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



// 토큰에서 추출한 userId
const currentUserId = 2; // JWT 토큰에 포함된 userId

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
  // 메시지 상태 관리
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔥 기존 chatRooms 상태를 새로운 훅으로 대체
  const { chatRoomsWithParticipants, isLoading: isLoadingRooms, fetchChatRoomsWithParticipants } = 
    useChatRoomsWithParticipants(currentUserId);

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

  // ✅ 웹소켓 연결용 안전한 이름 (단순화)
  const getWebSocketSafeName = (): string => {
    return `User${currentUserId}`;
  };

  // ✅ UI 표시용 실제 닉네임 (단순화)
  const getDisplayUserName = (): string => {
    return currentUser?.name || "테스트유저";
  };

  // ✅ 에러 시 최소 폴백 데이터 (단순화)
  const createFallbackUser = (id: number): User => ({
    id,
    email: `user${id}@example.com`,
    name: id === currentUserId ? "테스트유저" : `사용자${id}`
  });

  // 동적 사용자 이름 가져오기 (웹소켓용으로 수정)
  const getCurrentUserName = (): string => {
    return getWebSocketSafeName(); // 웹소켓용 안전한 이름 사용
  };

  // 웹소켓 연결 (동적 사용자 이름 사용)
  const {
    status: wsStatus,
    sendMessage: wsSendMessage,
    onMessage: onWsMessage,
    onUserEvent: onWsUserEvent,
    onSystemMessage: onWsSystemMessage,
  } = useWebSocket({
    chatroomId: activeRoomId,
    userId: currentUserId,
    userName: getCurrentUserName(),
    enabled: !!activeRoomId
  });

  // 환경 변수에서 가져온 액세스 토큰을 localStorage에 저장
  useEffect(() => {
    const token = import.meta.env.VITE_AUTH_TOKEN;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  }, []);

  // 현재 사용자 정보 초기화 (단순화)
  useEffect(() => {
    const defaultUser: User = {
      id: currentUserId,
      email: "user@example.com",
      name: "테스트유저"
    };
    setCurrentUser(defaultUser);
  }, []); // 의존성 제거

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
          const isRecentMyMessage = realtimeMessage.senderId === currentUserId;
          
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
        if (event.userId === currentUserId) {
          return;
        }
        
        // 다른 사용자의 입장/퇴장만 시스템 메시지로 표시
        const systemMessage: Message = {
          id: Date.now() + Math.random(),
          senderId: -1, // 시스템 메시지는 -1로 처리
          chatroomId: activeRoomId,
          content: `${event.userName}님이 ${event.action === 'join' ? '입장' : '퇴장'}하셨습니다.`,
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
        const systemMessage: Message = {
          id: Date.now() + Math.random(),
          senderId: -1, // 시스템 메시지는 -1로 처리
          chatroomId: activeRoomId,
          content: messageText.trim(),
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, systemMessage]);
      }
    });

  }, [activeRoomId, roomUsers, onWsMessage, onWsUserEvent, onWsSystemMessage, fetchChatRoomsWithParticipants]);

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
          userId: currentUserId,
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
        setRoomUsers([createFallbackUser(currentUserId)]);
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

  // 🔥 수정된 useEffect - 새로운 훅 사용
  useEffect(() => {
    fetchChatRoomsWithParticipants();
  }, []);

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
          currentUsers = [createFallbackUser(currentUserId)];
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
        users = [createFallbackUser(currentUserId)];
      }
      
      if (users && users.length > 0) {
        setRoomUsers(users);
        
        // 🎯 현재 사용자 정보 업데이트 (roomUsers에서 찾은 경우)
        const currentUserInRoom = users.find(user => user.id === currentUserId);
        if (currentUserInRoom) {
          setCurrentUser(currentUserInRoom);
        }
      } else {
        setRoomUsers([createFallbackUser(currentUserId)]);
      }
    } catch (error) {
      // 어떤 에러든 기본 사용자로 설정 (웹소켓은 계속 작동)
      setRoomUsers([createFallbackUser(currentUserId)]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // 방 선택 핸들러
  const handleSelectRoom = (roomId: number) => {
    if (roomId === activeRoomId) return;
    
    setActiveRoomId(roomId);
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
      await leaveChatRoom(currentUserId, activeRoomId);
      
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
        senderId: currentUserId,
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
        senderId: currentUserId,
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
    if (msg.senderId === currentUserId) return "나";
    
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
    return msg.senderId === currentUserId; // 단순하게 내 ID와 같은지만 확인
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
            {activeRoomId && (
              <div>
                {wsStatus === 'connected' && <span>● 연결됨</span>}
                {wsStatus === 'connecting' && <span>● 연결 중...</span>}
                {wsStatus === 'disconnected' && <span>● 연결 끊김</span>}
                {wsStatus === 'error' && <span>● 연결 오류</span>}
                <span>({getDisplayUserName()})</span>
              </div>
            )}
          </div>

          <div css={styles.ChatAnnouncement}>
            {activeRoomId
              ? selectedBook 
                ? `"${selectedBook.bookTitle}" 토론방에 입장하신 것을 환영합니다! 🎉`
                : "채팅방에 입장하신 것을 환영합니다"
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
                  {user?.id === currentUserId ? `${getDisplayUserName()} (나)` : (user?.name || "알 수 없음")}
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

          {activeRoomId && selectedBook && (
            <InfoBoxWithTimers
              title="현재 토론"
              discussionTitle={`📚 ${selectedBook.bookTitle}`}
              initialMinutes={15}
              initialSeconds={0}
              lineImage={Line}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;