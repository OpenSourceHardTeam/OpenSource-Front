// import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
// import * as styles from "./ChatPage.style";
// import Button from "../../components/Button/Button";
// import ChatRoomList, {
//   ChatRoom,
// } from "../../components/ChatRoomList/ChatRoomList";
// import InfoBoxWithTimers from "../../components/InfoBoxWithTimer/InfoBoxWithTimer";

// import Arrow from "../../assets/img/book-info-link.svg";
// import Line from "../../assets/img/Line.png";
// import messageClickButton from "../../assets/svg/messageClickButton.svg";

// // 타입 정의
// interface Message {
//   id: number;
//   sender: string;
//   message: string;
//   time: string;
//   isMine: boolean;
//   senderId?: string;
// }

// // 예제용 현재 사용자 ID (실제로는 인증 시스템에서 가져와야 함)
// // const currentUserId = "current-user-id";

// const ChatPage: React.FC = () => {
// //   // 메시지 상태 관리
// //   const [message, setMessage] = useState<string>("");
// //   const [messages, setMessages] = useState<Message[]>([]);

// //   // 채팅방 상태 관리
// //   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
// //   const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
// //   const [roomMessages, setRoomMessages] = useState<{
// //     [key: number]: Message[];
// //   }>({});

// //   // 로딩 상태
// //   const [isLoadingRooms, setIsLoadingRooms] = useState<boolean>(true);
// //   const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

// //   // 소켓 연결 상태
// //   const [socketConnected, setSocketConnected] = useState<boolean>(false);

//   // 채팅방 목록 가져오기
//   // useEffect(() => {
//   //   const fetchChatRooms = async () => {
//   //     setIsLoadingRooms(true);
//   //     try {
//         // API 호출로 사용자가 참여한 채팅방 목록 가져오기
//         // 실제 구현에서는 아래 주석 해제
//         // const response = await fetch('/api/chat-rooms');
//         // const data = await response.json();

//         // 임시 데이터 (백엔드 연동 전까지 사용)
//         // const data: ChatRoom[] = [
//         //   {
//         //     id: 1,
//         //     title: "소설의 힘 : 디지털 시대에서 역할?",
//         //     category: "논픽션",
//         //     participants: 15,
//         //     isActive: true,
//         //   },
//         //   {
//         //     id: 2,
//         //     title: "현대 문학의 트렌드와 미래",
//         //     category: "소설",
//         //     participants: 12,
//         //   },
//         //   {
//         //     id: 3,
//         //     title: "작가와의 대화: 창작 과정 공유",
//         //     category: "에세이",
//         //     participants: 8,
//         //   },
//         // ];

//         // setChatRooms(data);

//         // 첫 번째 방을 기본으로 선택
//         // if (data.length > 0) {
//         //   setActiveRoomId(data[0].id);
//           // 첫 번째 방의 메시지도 바로 가져오기
//     //       fetchRoomMessages(data[0].id);
//     //     }
//     //   } catch (error) {
//     //     console.error("채팅방 목록을 가져오는데 실패했습니다:", error);
//     //   } finally {
//     //     setIsLoadingRooms(false);
//     //   }
//     // };

//     // fetchChatRooms();

//     // 소켓 연결 설정 (예시)
//     // const setupSocket = () => {
//       // 실제 구현에서는 아래 주석 해제 및 socket.io-client 설치 필요
//       // const socket = io('http://your-backend-url');
//       // socket.on('connect', () => {
//       //   setSocketConnected(true);
//       //   console.log('소켓 연결됨');
//       // });

//       // socket.on('disconnect', () => {
//       //   setSocketConnected(false);
//       //   console.log('소켓 연결 끊김');
//       // });

//       // return socket;

//       // 예시용 소켓 연결 설정 (실제로는 구현 필요)
//     //   setSocketConnected(true);
//     //   return null;
//     // };

//     // const socket = setupSocket();

//     // 컴포넌트 언마운트 시 정리
//   //   return () => {
//   //     // 소켓 연결 해제
//   //     // if (socket) {
//   //     //   socket.disconnect();
//   //     // }
//   //   };
//   // }, []);

//   // 소켓을 통한 실시간 메시지 수신 설정
//   // useEffect(() => {
//   //   if (!activeRoomId || !socketConnected) return;

//     // 소켓을 통한 채팅방 참여 및 메시지 수신 (예시)
//     // const setupRoomSocket = () => {
//       // 실제 구현에서는 아래 주석 해제
//       // const socket = io('http://your-backend-url');

//       // // 채팅방 참여
//       // socket.emit('join-room', activeRoomId);

//       // // 새 메시지 수신
//       // socket.on('new-message', (receivedMessage) => {
//       //   const formattedMessage = {
//       //     ...receivedMessage,
//       //     isMine: receivedMessage.senderId === currentUserId
//       //   };

//       //   setMessages(prev => [...prev, formattedMessage]);
//       //   setRoomMessages(prev => ({
//       //     ...prev,
//       //     [activeRoomId]: [...(prev[activeRoomId] || []), formattedMessage]
//       //   }));
//       // });

//       // return socket;

//       // 예시용 (실제로는 구현 필요)
//     //   return null;
//     // };

//     // const roomSocket = setupRoomSocket();

//     // 컴포넌트 언마운트 또는 채팅방 변경 시 정리
//     // return () => {
//       // if (roomSocket) {
//       //   roomSocket.emit('leave-room', activeRoomId);
//       //   roomSocket.disconnect();
//       // }
//   //   };
//   // }, [activeRoomId, socketConnected]);

//   // 특정 채팅방의 메시지 가져오기
//   // const fetchRoomMessages = async (roomId: number) => {
//   //   if (!roomId) return;

//   //   setIsLoadingMessages(true);
//   //   try {
//   //     // 이미 가져온 메시지가 있다면 그것을 사용
//   //     if (roomMessages[roomId] && roomMessages[roomId].length > 0) {
//   //       setMessages(roomMessages[roomId]);
//   //       setIsLoadingMessages(false);
//   //       return;
//   //     }

//       // API 호출로 특정 채팅방의 메시지 내역 가져오기
//       // 실제 구현에서는 아래 주석 해제
//       // const response = await fetch(`/api/chat-rooms/${roomId}/messages`);
//       // const data = await response.json();

//       // 예제 데이터 (방 ID에 따라 다른 메시지 제공)
//       // let data: Message[];
//       // if (roomId === 1) {
//       //   data = [
//       //     {
//       //       id: 1,
//       //       sender: "북서랑",
//       //       message:
//       //         "안녕하세요! 소설의 사회적 역할에 대해 이야기해봤으면 합니다. 여러분은 소설이 현대 사회에 어떤 영향을 미친다고 생각하시나요?",
//       //       time: "10:15",
//       //       isMine: false,
//       //       senderId: "user-1",
//       //     },
//       //     {
//       //       id: 2,
//       //       sender: "문학연구자",
//       //       message:
//       //         "저는 소설이 우리 사회의 거울 역할을 한다고 생각합니다. 시대의 문제와 고민을 반영하고, 때로는 비판적인 시각을 제시함으로써 사회적 담론을 형성하는 중요한 매체라고 봅니다.",
//       //       time: "10:18",
//       //       isMine: false,
//       //       senderId: "user-2",
//       //     },
//       //     {
//       //       id: 3,
//       //       sender: "작가",
//       //       message:
//       //         "저는 소설이 우리가 다른 사람의 삶과 경험을 간접적으로 체험할 수 있게 해준다는 점에서 공감 능력을 향상시키는 역할을 한다고 생각합니다.",
//       //       time: "10:20",
//       //       isMine: false,
//       //       senderId: "user-3",
//       //     },
//       //     {
//       //       id: 4,
//       //       sender: "작별레",
//       //       message:
//       //         '두 분 모두 좋은 관점이에요! 저는 조금 다른 측면에서, 소설이 복잡한 현실에서 살아남기 위해 다른 세계를 경험할 수 있게 해주는 "도피처" 역할도 한다고 생각합니다. 어떤 역할도 중요하지 않을까요?',
//       //       time: "10:23",
//       //       isMine: false,
//       //       senderId: "user-4",
//       //     },
//       //   ];
//       // } else if (roomId === 2) {
//       //   data = [
//       //     {
//       //       id: 1,
//       //       sender: "문학평론가",
//       //       message:
//       //         "최근 디지털 플랫폼의 발전으로 문학 소비 형태가 많이 바뀌었습니다. 여러분은 이러한 변화가 문학의 본질에 어떤 영향을 미친다고 보시나요?",
//       //       time: "14:05",
//       //       isMine: false,
//       //       senderId: "user-5",
//       //     },
//       //     {
//       //       id: 2,
//       //       sender: "독자",
//       //       message:
//       //         "저는 오히려 더 다양한 문학에 접근할 수 있게 되어서 좋다고 생각합니다. 종이책만으로는 만나기 어려웠던 작품들을 쉽게 읽을 수 있게 되었으니까요.",
//       //       time: "14:07",
//       //       isMine: false,
//       //       senderId: "user-6",
//       //     },
//       //   ];
//       // } else {
//       //   data = [
//       //     {
//       //       id: 1,
//       //       sender: "소설가",
//       //       message:
//       //         "안녕하세요! 오늘은 제가 소설을 쓰는 과정에 대해 이야기해보려고 합니다. 혹시 창작 과정에 대해 궁금한 점이 있으신가요?",
//       //       time: "16:30",
//       //       isMine: false,
//       //       senderId: "user-7",
//       //     },
//       //   ];
//       // }

//       // 메시지 상태 업데이트
//   //     setMessages(data);

//   //     // 방별 메시지 저장소에도 저장
//   //     setRoomMessages((prev) => ({
//   //       ...prev,
//   //       [roomId]: data,
//   //     }));
//   //   } catch (error) {
//   //     console.error(`방 ${roomId}의 메시지를 가져오는데 실패했습니다:`, error);
//   //   } finally {
//   //     setIsLoadingMessages(false);
//   //   }
//   // };

//   // 방 선택 핸들러
//   // const handleSelectRoom = (roomId: number) => {
//   //   setActiveRoomId(roomId);
//   //   fetchRoomMessages(roomId);
//   // };

//   // 메시지 전송 처리 (사용자)
//   // const handleSendMessage = async (): Promise<void> => {
//   //   if (message.trim() === "" || !activeRoomId) return;

//   //   const newMessage: Message = {
//   //     id: Date.now(), // 임시 ID (백엔드에서 실제 ID 부여)
//   //     sender: "",
//   //     message: message,
//   //     time: new Date().toLocaleTimeString([], {
//   //       hour: "2-digit",
//   //       minute: "2-digit",
//   //     }),
//   //     isMine: true,
//   //     senderId: currentUserId,
//   //   };

//   //   // 로컬 상태 먼저 업데이트 (즉각적인 UI 반응)
//   //   const updatedMessages = [...messages, newMessage];
//   //   setMessages(updatedMessages);

//   //   // 방별 메시지 저장소도 업데이트
//   //   setRoomMessages((prev) => ({
//   //     ...prev,
//   //     [activeRoomId]: updatedMessages,
//   //   }));

//   //   // 메시지 입력창 초기화
//   //   setMessage("");

//   //   try {
//       // 백엔드에 메시지 저장 (실제 구현에서는 주석 해제)
//       // await fetch(`/api/chat-rooms/${activeRoomId}/messages`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({
//       //     content: message,
//       //     roomId: activeRoomId,
//       //     senderId: currentUserId
//       //   }),
//       // });

//       // 소켓을 통한 메시지 전송 (실제 구현에서는 주석 해제)
//       // socket.emit('send-message', {
//       //   content: message,
//       //   roomId: activeRoomId,
//       //   senderId: currentUserId
//       // });

//   //     console.log("메시지 전송됨:", message, "방 ID:", activeRoomId);
//   //   } catch (error) {
//   //     console.error("메시지 전송에 실패했습니다:", error);
//   //     // 오류 처리 (필요시 사용자에게 알림)
//   //   }
//   // };

//   // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
//   //   if (e.key === "Enter") {
//   //     handleSendMessage();
//   //   }
//   // };

//   // const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//   //   setMessage(e.target.value);
//   // };

//   // // 활성화된 방 정보 가져오기
//   // const activeRoom = chatRooms.find((room) => room.id === activeRoomId);

//   return (
//     <div css={styles.PageContainer}>
//       <div css={styles.ContentContainer}>
//         <div css={styles.SidebarLeft}>
//           <div css={styles.BookingBox}>
//             <h3 css={styles.HeaderText}>소설의 힘 토론방</h3>
//             <div>책 상세 정보 보기</div>
//           </div>

//           {/* <ChatRoomList
//             rooms={chatRooms}
//             onSelectRoom={handleSelectRoom}
//             activeRoomId={activeRoomId || undefined}
//             isLoading={isLoadingRooms}
//           /> */}
//         </div>

//         <div css={styles.ChatContainer}>
//           <div css={styles.ChatHeader}>
//             <span>{activeRoom?.title || "채팅방을 선택해주세요"}</span>
//             {!socketConnected && (
//               <span css={styles.ConnectionStatus}>연결 중...</span>
//             )}
//           </div>

//           <div css={styles.ChatAnnouncement}>
//             {activeRoomId
//               ? "채팅방에 입장하신 것을 환영합니다"
//               : "왼쪽의 채팅방 목록에서 채팅방을 선택해주세요"}
//           </div>

//           <div css={styles.MessageList}>
//             {isLoadingMessages ? (
//               <div css={styles.LoadingMessages}>메시지를 불러오는 중...</div>
//             ) : messages.length === 0 ? (
//               <div css={styles.EmptyMessages}>
//                 아직 메시지가 없습니다. 첫 메시지를 보내보세요!
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} css={styles.MessageGroup}>
//                   <div css={styles.MessageHeader}>
//                     <span
//                       css={
//                         msg.isMine
//                           ? styles.MessageSenderMine
//                           : styles.MessageSender
//                       }
//                     >
//                       {msg.sender}
//                     </span>
//                     <span css={styles.MessageTime}>{msg.time}</span>
//                   </div>
//                   <div
//                     css={
//                       msg.isMine
//                         ? styles.MessageBubbleMine
//                         : styles.MessageBubble
//                     }
//                   >
//                     {msg.message}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div css={styles.MessageInputContainer}>
//             <input
//               css={styles.MessageInputField}
//               value={message}
//               onChange={handleInputChange}
//               onKeyPress={handleKeyPress}
//               placeholder="메시지를 입력하세요..."
//               // disabled={!activeRoomId || !socketConnected} //나중에 소켓 연결 시 주석 해제
//             />
//             <button
//               css={styles.SendButton}
//               onClick={handleSendMessage}
//               // disabled={!activeRoomId || !socketConnected}
//             >
//               <img src={messageClickButton} />
//             </button>
//           </div>
//         </div>

//         <div css={styles.SidebarRight}>
//           <Button
//             css={styles.LeaveButton}
//             text={"채팅방 나가기"}
//             type={"leave"}
//           />

//           <div css={styles.ParticipantList}>
//             <h3 css={styles.HeaderText}>
//               <img css={styles.arrowStyle} src={Arrow} />
//               참여자 ({activeRoom?.participants || 0})
//             </h3>
//             <img css={styles.lineStyle} src={Line} />
//             {activeRoomId === 1 && (
//               <>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 독서광
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 문학연구자
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 작별레
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 문학교사
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 나 +7명
//                 </div>
//               </>
//             )}
//             {activeRoomId === 2 && (
//               <>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 문학평론가
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 독자
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 나 +9명
//                 </div>
//               </>
//             )}
//             {activeRoomId === 3 && (
//               <>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 소설가
//                 </div>
//                 <div css={styles.ParticipantItem}>
//                   <div css={styles.ParticipantDot}></div> 나 +6명
//                 </div>
//               </>
//             )}
//             {!activeRoomId && (
//               <div css={styles.EmptyParticipants}>
//                 채팅방을 선택하면 참여자 목록이 표시됩니다.
//               </div>
//             )}
//           </div>

//           {activeRoomId === 1 && (
//             <>
//               <InfoBoxWithTimers
//                 title="현재 토론"
//                 discussionTitle="소설은 현대 사회에서 어떤 역할을 하는가?"
//                 initialMinutes={15}
//                 initialSeconds={0}
//                 lineImage={Line}
//               />

//               <div css={styles.InfoBox}>
//                 <h3 css={styles.HeaderText}>다른 토론 주제</h3>
//                 <div css={styles.InfoQuestion}>
//                   <p css={styles.QuestionText}>
//                     디지털 시대에 종이책의 가치는?
//                   </p>
//                   <p css={styles.QuestionDetail}>참여: 10명</p>
//                 </div>
//                 <div css={styles.InfoQuestion}>
//                   <p css={styles.QuestionText}>
//                     작가의 의도는 얼마나 중요한가?
//                   </p>
//                   <p css={styles.QuestionDetail}>참여: 8명</p>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeRoomId === 2 && (
//             <InfoBoxWithTimers
//               title="현재 토론"
//               discussionTitle="디지털 시대의 문학 소비 형태"
//               initialMinutes={15}
//               initialSeconds={0}
//               lineImage={Line}
//             />
//           )}

//           {activeRoomId === 3 && (
//             <InfoBoxWithTimers
//               title="현재 세션"
//               discussionTitle="소설가와 함께하는 창작 과정 탐구"
//               initialMinutes={15}
//               initialSeconds={0}
//               lineImage={Line}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
