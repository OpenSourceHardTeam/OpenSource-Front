import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import * as styles from "./ChatPage.style";
import Button from "../../components/Button/Button";
import ChatRoomList from "../../components/ChatRoomList/ChatRoomList";
import InfoBoxWithTimers from "../../components/InfoBoxWithTimer/InfoBoxWithTimer";

import Arrow from "../../assets/svg/book-info-link.svg";
import Line from "../../assets/img/Line.png";
import messageClickButton from "../../assets/svg/messageClickButton.svg";

// API 함수들과 타입 임포트
import {
  getUserChatRooms,
  getUserChatRoom,
  getChatRoomUsers,
  leaveChatRoom,
  JoinChatRoom,
  ChatRoom,
  Message,
  User
} from "../../apis/hooks/chat/useChatApi";

// 더미 데이터 사용 플래그
const USE_DUMMY_DATA = true; // true: 더미 데이터 사용, false: 실제 API 데이터 사용

// 토큰에서 추출한 userId
const currentUserId = 6; // JWT 토큰에 포함된 userId

// 대체 데이터 (API 호출 실패 시 사용)
const dummyChatRooms: ChatRoom[] = [
  {
    id: 1,
    externalRoomId: "room-1",
    topic: "소설의 힘 : 디지털 시대에서 역할?",
    book: {
      bookId: 101,
      bookRank: 1,
      bookImageUrl: "",
      bookTitle: "논픽션",
      bookAuthor: "작가명",
      bookDescription: "설명",
      publisherName: "출판사",
      publishDate: "2023-01-01",
      publisherReview: "리뷰"
    },
    totalParticipants: 15,
    messageSequence: 1,
    currentParticipants: 10,
    messageCount: 25,
    isArchived: false
  },
  {
    id: 2,
    externalRoomId: "room-2",
    topic: "현대 문학의 트렌드와 미래",
    book: {
      bookId: 102,
      bookRank: 2,
      bookImageUrl: "",
      bookTitle: "소설",
      bookAuthor: "작가명2",
      bookDescription: "설명2",
      publisherName: "출판사2",
      publishDate: "2023-02-01",
      publisherReview: "리뷰2"
    },
    totalParticipants: 12,
    messageSequence: 1,
    currentParticipants: 8,
    messageCount: 15,
    isArchived: false
  },
  {
    id: 3,
    externalRoomId: "room-3",
    topic: "작가와의 대화: 창작 과정 공유",
    book: {
      bookId: 103,
      bookRank: 3,
      bookImageUrl: "",
      bookTitle: "에세이",
      bookAuthor: "작가명3",
      bookDescription: "설명3",
      publisherName: "출판사3",
      publishDate: "2023-03-01",
      publisherReview: "리뷰3"
    },
    totalParticipants: 8,
    messageSequence: 1,
    currentParticipants: 6,
    messageCount: 10,
    isArchived: false
  }
];

// 방별 더미 메시지 설정
const dummyRoomMessages = {
  1: [
    {
      id: 1,
      sender: "북서랑",
      message: "안녕하세요! 소설의 사회적 역할에 대해 이야기해봤으면 합니다. 여러분은 소설이 현대 사회에 어떤 영향을 미친다고 생각하시나요?",
      time: "10:15",
      isMine: false,
      senderId: "user-1"
    },
    {
      id: 2,
      sender: "문학연구자",
      message: "저는 소설이 우리 사회의 거울 역할을 한다고 생각합니다. 시대의 문제와 고민을 반영하고, 때로는 비판적인 시각을 제시함으로써 사회적 담론을 형성하는 중요한 매체라고 봅니다.",
      time: "10:18",
      isMine: false,
      senderId: "user-2"
    },
    {
      id: 3,
      sender: "작가",
      message: "저는 소설이 우리가 다른 사람의 삶과 경험을 간접적으로 체험할 수 있게 해준다는 점에서 공감 능력을 향상시키는 역할을 한다고 생각합니다.",
      time: "10:20",
      isMine: false,
      senderId: "user-3"
    }
  ],
  2: [
    {
      id: 201,
      sender: "문학평론가",
      message: "최근 디지털 플랫폼의 발전으로 문학 소비 형태가 많이 바뀌었습니다. 여러분은 이러한 변화가 문학의 본질에 어떤 영향을 미친다고 보시나요?",
      time: "14:05",
      isMine: false,
      senderId: "user-5"
    },
    {
      id: 202,
      sender: "독자",
      message: "저는 오히려 더 다양한 문학에 접근할 수 있게 되어서 좋다고 생각합니다. 종이책만으로는 만나기 어려웠던 작품들을 쉽게 읽을 수 있게 되었으니까요.",
      time: "14:07",
      isMine: false,
      senderId: "user-6"
    }
  ],
  3: [
    {
      id: 301,
      sender: "소설가",
      message: "안녕하세요! 오늘은 제가 소설을 쓰는 과정에 대해 이야기해보려고 합니다. 혹시 창작 과정에 대해 궁금한 점이 있으신가요?",
      time: "16:30",
      isMine: false,
      senderId: "user-7"
    }
  ]
};

// 방별 더미 사용자 설정
const dummyRoomUsers = {
  1: [
    { id: currentUserId, email: "me@example.com", name: "나" },
    { id: 1, email: "bookmaster@example.com", name: "북서랑" },
    { id: 2, email: "researcher@example.com", name: "문학연구자" },
    { id: 3, email: "writer@example.com", name: "작가" },
    { id: 4, email: "teacher@example.com", name: "문학교사" }
  ],
  2: [
    { id: currentUserId, email: "me@example.com", name: "나" },
    { id: 5, email: "critic@example.com", name: "문학평론가" },
    { id: 6, email: "reader@example.com", name: "독자" }
  ],
  3: [
    { id: currentUserId, email: "me@example.com", name: "나" },
    { id: 7, email: "author@example.com", name: "소설가" }
  ]
};

const ChatPage: React.FC = () => {
  // 메시지 상태 관리
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // 채팅방 상태 관리
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
  const [roomMessages, setRoomMessages] = useState<{
    [key: number]: Message[];
  }>({});
  
  // 사용자 목록 상태
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  // 로딩 상태
  const [isLoadingRooms, setIsLoadingRooms] = useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

  // 환경 변수에서 가져온 액세스 토큰을 localStorage에 저장
  useEffect(() => {
    const token = import.meta.env.VITE_AUTH_TOKEN;
    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("토큰이 로컬 스토리지에 저장되었습니다.");
    }
  }, []);

  // 채팅방 목록 가져오기
  useEffect(() => {
    const fetchChatRooms = async () => {
      setIsLoadingRooms(true);
      
      // 더미 데이터 사용 모드
      if (USE_DUMMY_DATA) {
        // 로딩 효과를 위한 지연
        setTimeout(() => {
          setChatRooms(dummyChatRooms);
          setActiveRoomId(dummyChatRooms[0].id);
          setMessages(dummyRoomMessages[1]);
          setRoomMessages(dummyRoomMessages);
          setRoomUsers(dummyRoomUsers[1]);
          setIsLoadingRooms(false);
        }, 500);
        return;
      }
      
      // 실제 API 사용 모드
      try {
        // 실제 API 호출
        const response = await getUserChatRooms(currentUserId);
        
        // 응답 데이터가 있는지 확인
        if (response && Array.isArray(response) && response.length > 0) {
          setChatRooms(response);
          
          // 첫 번째 방을 기본으로 선택
          setActiveRoomId(response[0].id);
          fetchRoomMessages(response[0].id);
          fetchRoomUsers(response[0].id);
        } else {
          // 응답이 없거나 빈 경우 더미 데이터 사용
          console.log("유효한 채팅방 데이터가 없습니다. 더미 데이터를 사용합니다.");
          setChatRooms(dummyChatRooms);
          setActiveRoomId(dummyChatRooms[0].id);
          setMessages(dummyRoomMessages[1]);
          setRoomMessages(dummyRoomMessages);
          setRoomUsers(dummyRoomUsers[1]);
        }
      } catch (error) {
        console.error("채팅방 목록을 가져오는데 실패했습니다:", error);
        
        // 에러 발생 시 대체 데이터 사용
        setChatRooms(dummyChatRooms);
        setActiveRoomId(dummyChatRooms[0].id);
        setMessages(dummyRoomMessages[1]);
        setRoomMessages(dummyRoomMessages);
        setRoomUsers(dummyRoomUsers[1]);
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchChatRooms();
  }, []);

  // 특정 채팅방의 메시지 가져오기
  const fetchRoomMessages = async (roomId: number) => {
    if (!roomId) return;

    setIsLoadingMessages(true);
    
    // 더미 데이터 사용 모드
    if (USE_DUMMY_DATA) {
      setTimeout(() => {
        const roomDummyMessages = dummyRoomMessages[roomId] || [];
        setMessages(roomDummyMessages);
        setIsLoadingMessages(false);
      }, 300);
      return;
    }
    
    try {
      // 이미 가져온 메시지가 있다면 그것을 사용
      if (roomMessages[roomId] && roomMessages[roomId].length > 0) {
        setMessages(roomMessages[roomId]);
        setIsLoadingMessages(false);
        return;
      }

      // API 호출로 메시지 가져오기
      try {
        // 실제 API 구현이 준비되면 이 부분을 활성화
        // const response = await getUserChatRoom(currentUserId, roomId);
        
        // 임시로 더미 메시지 사용
        const roomDummyMessages = dummyRoomMessages[roomId] || [];
        setMessages(roomDummyMessages);
        setRoomMessages(prev => ({
          ...prev,
          [roomId]: roomDummyMessages
        }));
      } catch (error) {
        console.error(`메시지를 가져오는데 실패했습니다:`, error);
        setMessages([]);
      }
    } finally {
      setIsLoadingMessages(false);
    }
  };
  
  // 채팅방 사용자 목록 가져오기
  const fetchRoomUsers = async (roomId: number) => {
    if (!roomId) return;
    
    setIsLoadingUsers(true);
    
    // 더미 데이터 사용 모드
    if (USE_DUMMY_DATA) {
      setTimeout(() => {
        const users = dummyRoomUsers[roomId] || [];
        setRoomUsers(users);
        setIsLoadingUsers(false);
      }, 300);
      return;
    }
    
    try {
      const response = await getChatRoomUsers(roomId);
      
      const users = Array.isArray(response) 
        ? response 
        : Object.values(response);
      
      if (users && users.length > 0) {
        setRoomUsers(users);
      } else {
        // 기본 사용자 목록
        setRoomUsers(dummyRoomUsers[roomId] || [
          { id: currentUserId, email: "me@example.com", name: "나" }
        ]);
      }
    } catch (error) {
      console.error("사용자 목록을 가져오는데 실패했습니다:", error);
      // 기본 사용자 목록
      setRoomUsers(dummyRoomUsers[roomId] || [
        { id: currentUserId, email: "me@example.com", name: "나" }
      ]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // 방 선택 핸들러
  const handleSelectRoom = (roomId: number) => {
    if (roomId === activeRoomId) return;
    
    setActiveRoomId(roomId);
    fetchRoomMessages(roomId);
    fetchRoomUsers(roomId);
  };

  // 채팅방 참여 처리 함수
  const handleJoinChatRoom = async (chatroomId: number) => {
    try {
      if (!USE_DUMMY_DATA) {
        await JoinChatRoom({
          userId: currentUserId,
          chatroomId: chatroomId
        });
        
        // 채팅방 목록 다시 불러오기
        const response = await getUserChatRooms(currentUserId);
        if (response && Array.isArray(response) && response.length > 0) {
          setChatRooms(response);
        }
      }
      
      // 참여한 방으로 이동
      setActiveRoomId(chatroomId);
      fetchRoomMessages(chatroomId);
      fetchRoomUsers(chatroomId);
      
      alert("채팅방에 참여했습니다.");
    } catch (error) {
      console.error("채팅방 참여에 실패했습니다:", error);
      alert("채팅방 참여에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 채팅방 나가기 처리
  const handleLeaveRoom = async () => {
    if (!activeRoomId) return;
    
    if (!window.confirm("정말 채팅방을 나가시겠습니까?")) {
      return;
    }
    
    try {
      if (!USE_DUMMY_DATA) {
        await leaveChatRoom(currentUserId, activeRoomId);
      }
      
      // 채팅방 목록에서 해당 방 제거
      setChatRooms(prev => prev.filter(room => room.id !== activeRoomId));
      
      // 다른 방 선택
      const newRooms = chatRooms.filter(room => room.id !== activeRoomId);
      if (newRooms.length > 0) {
        setActiveRoomId(newRooms[0].id);
        fetchRoomMessages(newRooms[0].id);
        fetchRoomUsers(newRooms[0].id);
      } else {
        setActiveRoomId(null);
        setMessages([]);
        setRoomUsers([]);
      }
      
      alert("채팅방에서 나갔습니다.");
    } catch (error) {
      console.error("채팅방 나가기에 실패했습니다:", error);
      alert("채팅방 나가기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 메시지 전송 처리 (사용자)
  const handleSendMessage = async (): Promise<void> => {
    if (message.trim() === "" || !activeRoomId) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "나",
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
      senderId: currentUserId.toString(),
    };

    // 로컬 상태 먼저 업데이트 (즉각적인 UI 반응)
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // 방별 메시지 저장소도 업데이트
    setRoomMessages((prev) => ({
      ...prev,
      [activeRoomId]: updatedMessages,
    }));

    // 메시지 입력창 초기화
    setMessage("");

    // 소켓 구현이 완료되면 이 부분에 실제 메시지 전송 로직 추가
    console.log('메시지 전송:', message);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  // 활성화된 방 정보 가져오기
  const activeRoom = chatRooms.find((room) => room.id === activeRoomId);

  return (
    <div css={styles.PageContainer}>
      <div css={styles.ContentContainer}>
        <div css={styles.SidebarLeft}>
          <div css={styles.BookingBox}>
            <h3 css={styles.HeaderText}>소설의 힘 토론방</h3>
            <div>책 상세 정보 보기</div>
          </div>

          <ChatRoomList
            rooms={chatRooms.map(room => ({
              id: room.id,
              title: room.topic,
              category: room.book?.bookTitle || "분류 없음",
              participants: room.currentParticipants,
              isActive: !room.isArchived
            }))}
            onSelectRoom={handleSelectRoom}
            activeRoomId={activeRoomId || undefined}
            isLoading={isLoadingRooms}
          />
        </div>

        <div css={styles.ChatContainer}>
          <div css={styles.ChatHeader}>
            <span>{activeRoom?.topic || "채팅방을 선택해주세요"}</span>
          </div>

          <div css={styles.ChatAnnouncement}>
            {activeRoomId
              ? "채팅방에 입장하신 것을 환영합니다"
              : "왼쪽의 채팅방 목록에서 채팅방을 선택해주세요"}
          </div>

          <div css={styles.MessageList}>
            {isLoadingMessages ? (
              <div css={styles.LoadingMessages}>메시지를 불러오는 중...</div>
            ) : messages.length === 0 ? (
              <div css={styles.EmptyMessages}>
                아직 메시지가 없습니다. 첫 메시지를 보내보세요!
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} css={styles.MessageGroup}>
                  <div css={styles.MessageHeader}>
                    <span
                      css={
                        msg.isMine
                          ? styles.MessageSenderMine
                          : styles.MessageSender
                      }
                    >
                      {msg.sender}
                    </span>
                    <span css={styles.MessageTime}>{msg.time}</span>
                  </div>
                  <div
                    css={
                      msg.isMine
                        ? styles.MessageBubbleMine
                        : styles.MessageBubble
                    }
                  >
                    {msg.message}
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
              placeholder="메시지를 입력하세요..."
              disabled={!activeRoomId}
            />
            <button
              css={styles.SendButton}
              onClick={handleSendMessage}
              disabled={!activeRoomId}
            >
              <img src={messageClickButton} alt="전송" />
            </button>
          </div>
        </div>

        <div css={styles.SidebarRight}>
          <Button
            css={styles.LeaveButton}
            text={"채팅방 나가기"}
            type={"leave"}
            onClick={handleLeaveRoom}
          />

          <div css={styles.ParticipantList}>
            <h3 css={styles.HeaderText}>
              <img css={styles.arrowStyle} src="/assets/img/book-info-link.svg" alt="화살표" />
              참여자 ({activeRoom?.currentParticipants || 0})
            </h3>
            <img css={styles.lineStyle} src={Line} alt="구분선" />
            
            {isLoadingUsers ? (
              <div>참여자 목록을 불러오는 중...</div>
            ) : activeRoomId && roomUsers.length > 0 ? (
              roomUsers.map(user => (
                <div key={user.id} css={styles.ParticipantItem}>
                  <div css={styles.ParticipantDot}></div> 
                  {user.id === currentUserId ? `${user.name} (나)` : user.name}
                </div>
              ))
            ) : (
              !activeRoomId && (
                <div css={styles.EmptyParticipants}>
                  채팅방을 선택하면 참여자 목록이 표시됩니다.
                </div>
              )
            )}
          </div>

          {activeRoomId && activeRoom && (
            <InfoBoxWithTimers
              title="현재 토론"
              discussionTitle={activeRoom.topic}
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
