import { css } from '@emotion/react';

export const PageContainer = css`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  `;

export const ContentContainer = css`
  display: flex;
  flex: 1;
  padding: 20px;
`;

export const SidebarLeft = css`
  width: 270px;
  margin-right: 56px;
  margin-left: 24px;
`;

export const ChatContainer = css`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 22px;
`;

export const SidebarRight = css`
  width: 288px;
  margin-left: 45px;
`;

export const HeaderText = css`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #0e2624;
`;

export const HeaderText2 = css`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #0e2624;
  margin-top: 28px;
`;

export const BookingBox = css`
  display: flex;
  flex-direction: column;
  padding: 18px 15px 13px 15px;
  width: 269px;
  border-radius: 20px;
  border: 1px solid #d4d4d4;
  gap: 11px;
  margin-top: 22px;
`;

export const BookingItem = css`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  height: 87px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #6c89c0;
    background-color: #f9fafc;
  }
`;

export const BookingContent = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const ActiveBookingItem = css`
  border-color: #6c89c0;
  background-color: #f0f4fa;
  box-shadow: 0 2px 4px rgba(108, 137, 192, 0.1);
`;

export const BookingLabel = css`
  font-size: 16px;
  font-weight: 500;
  color: #0e2624;
  margin: 0 0 8px 0;
`;

export const BookingInfo = css`
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
  
`;

export const ChatHeader = css`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
`;

export const ConnectionStatus = css`
  font-size: 12px;
  color: #ff6b6b;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff6b6b;
    margin-right: 5px;
  }
`;

export const ChatAnnouncement = css`
  background-color: #f5f5f5;
  padding: 10px 15px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

export const MessageList = css`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const LoadingMessages = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 14px;
`;

export const EmptyMessages = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 14px;
  text-align: center;
`;

export const MessageGroup = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MessageHeader = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const MessageSender = css`
  font-weight: bold;
  font-size: 14px;
`;

export const MessageSenderMine = css`
  font-weight: normal;
  font-size: 14px;
`;

export const MessageTime = css`
  font-size: 12px;
  color: #999;
`;

export const MessageBubble = css`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 12px 15px;
  max-width: 80%;
  align-self: flex-start;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.5;
`;

export const MessageBubbleMine = css`
  background-color: #f0f4fa;
  border: 1px solid #d4e2f4;
  border-radius: 10px;
  padding: 12px 15px;
  max-width: 80%;
  align-self: flex-end;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.5;
`;

export const MessageInputContainer = css`
  display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;

export const MessageInputField = css`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #6c89c0;
  }
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const SendButton = css`
  background-color: #fff;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-top: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover:not(:disabled) {
    background-color: #f0f4fa;
  }
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const ScheduleButton = css`
  background-color: #6c89c0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 0;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #5a77ae;
  }
`;

export const LeaveButton = css `
    margin-bottom: 44px;
    margin-top: 22px;
`;

export const ParticipantList = css`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #d4d4d4;
  margin-bottom: 20px;
  background: #fcf6f5;
`;

export const arrowStyle = css`
  filter: invert(13%) sepia(30%) saturate(487%) hue-rotate(137deg) brightness(94%) contrast(94%);
  margin-right: 7px;
`;

export const lineStyle = css `
    width: 288px;
    height: 2px;
    flex-shrink: 0;
    padding-right: 30px;
    margin-bottom: 10px;
`;

export const EmptyParticipants = css`
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 10px 0;
`;

export const ParticipantItem = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const ParticipantDot = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333;
  margin-right: 8px;
`;

export const InfoBox = css`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #d4d4d4;
  margin-bottom: 15px;
  background: #fcf6f5;
`;

export const InfoBoxHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const RemainingTime = css`
  font-size: 14px;
  font-weight: 500;
`;

export const FinishedBadge = css`
  background-color: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 10px;
`;

export const InfoTitle = css`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const InfoDetail = css`
  font-size: 13px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

export const InfoQuestion = css`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const QuestionText = css`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const QuestionDetail = css`
  font-size: 12px;
  color: #777;
  margin: 0;
`;

export const MainContainer = css`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  height: 100vh;
`;

export const ChatRoomListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EmptyRoomMessage = css`
  padding: 15px;
  text-align: center;
  color: #999;
  font-size: 14px;
  border: 1px dashed #e0e0e0;
  border-radius: 10px;
  margin-top: 10px;
`;

export const LoadingMessage = css`
  padding: 15px;
  text-align: center;
  color: #999;
  font-size: 14px;
  border: 1px dashed #e0e0e0;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Announcement = css`
  background-color: #f5f5f5;
  padding: 10px 15px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

// 연결 상태 스타일
// export const ConnectionStatus = css`
//   display: flex;
//   align-items: center;
//   font-size: 12px;
//   margin-left: 10px;
// `;

export const StatusConnected = css`
  color: #22c55e;
`;

export const StatusConnecting = css`
  color: #f59e0b;
`;

export const StatusDisconnected = css`
  color: #ef4444;
`;

export const StatusError = css`
  color: #dc2626;
`;

export const BookListContainer = css`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const BookItems = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

export const BookItem = css`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    background-color: #f8f9fa;
    border-color: #e9ecef;
  }
`;

export const BookItemSelected = css`
  background-color: #e8f4f8;
  border-color: #3498db;
`;

export const BookImage = css`
  width: 48px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const BookInfo = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BookTitle = css`
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const BookAuthor = css`
  font-size: 12px;
  color: #7f8c8d;
`;

export const BookRank = css`
  font-size: 11px;
  color: #e67e22;
  font-weight: 500;
`;

export const LoadingBooks = css`
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
`;

export const EmptyBooks = css`
  text-align: center;
  padding: 20px;
  color: #95a5a6;
  font-size: 14px;
`;

export const ErrorBooks = css`
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  font-size: 14px;
`;

export const RetryButton = css`
  display: block;
  margin: 8px auto 0;
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #2980b9;
  }
`;


export const ArgumentSelectorOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ArgumentSelectorModal = css`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

export const ArgumentSelectorTitle = css`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
`;

export const ArgumentSelectorSubtitle = css`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 24px;
`;

export const ArgumentList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ArgumentItem = css`
  padding: 16px;
  border: 2px solid #ecf0f1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
  }
`;

export const ArgumentCategory = css`
  font-size: 12px;
  color: #e67e22;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const ArgumentTitle = css`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

export const ArgumentDescription = css`
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.4;
`;

export const ArgumentSelectorButtons = css`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const CancelButton = css`
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #7f8c8d;
  }
`;

// 🆕 토론 제어 컨테이너
export const DiscussionControlContainer = css`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

// 🆕 토론 타이머 (헤더에 표시)
export const DiscussionTimer = css`
  margin-left: 10px;
  color: #e53e3e;
  font-weight: bold;
  font-size: 0.9em;
`;

// 🆕 토론 설정 영역
export const DiscussionSetup = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 🆕 토론 주제 입력 컨테이너
export const DiscussionTopicInputContainer = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// 🆕 토론 주제 입력 필드
export const DiscussionTopicInput = css`
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3182ce;
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

// 🆕 토론 시작 버튼
export const StartDiscussionButton = css`
  padding: 10px 20px;
  background: linear-gradient(45deg, #4299e1, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #3182ce, #2c5aa0);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

// 🆕 토론 시간 설정
export const DiscussionDuration = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  label {
    color: #4a5568;
    font-weight: 500;
  }

  select {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 14px;
    cursor: pointer;

    &:disabled {
      background: #f7fafc;
      cursor: not-allowed;
    }
  }
`;

// 🆕 토론 진행 중 영역
export const DiscussionActive = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 🆕 현재 토론 정보
export const CurrentDiscussion = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 🆕 토론 주제 표시
export const DiscussionTopic = css`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  padding: 10px;
  background: linear-gradient(135deg, #ebf8ff, #bee3f8);
  border-radius: 8px;
  border-left: 4px solid #3182ce;
`;

// 🆕 토론 진행 상황
export const DiscussionProgress = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 🆕 토론 시간 정보
export const DiscussionTimeInfo = css`
  font-size: 14px;
  color: #4a5568;
  text-align: center;

  strong {
    color: #e53e3e;
    font-size: 16px;
  }
`;

// 🆕 토론 진행 바
export const DiscussionProgressBar = css`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

// 🆕 토론 진행 바 채우기
export const DiscussionProgressFill = css`
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  border-radius: 4px;
  transition: width 1s linear;
`;

// 🆕 토론 종료 버튼
export const EndDiscussionButton = css`
  padding: 10px 20px;
  background: linear-gradient(45deg, #e53e3e, #c53030);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(45deg, #c53030, #9c2626);
    transform: translateY(-1px);
  }
`;

// 🆕 토론 종료 영역
export const DiscussionEnded = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 🆕 종료된 토론 정보
export const EndedDiscussion = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 🆕 토론 종료 정보
export const DiscussionEndInfo = css`
  font-size: 14px;
  color: #4a5568;
  text-align: center;
  padding: 10px;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

// 🆕 새 토론 시작 버튼
export const NewDiscussionButton = css`
  padding: 10px 20px;
  background: linear-gradient(45deg, #48bb78, #38a169);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(45deg, #38a169, #2f855a);
    transform: translateY(-1px);
  }
`;

// 🆕 채팅 헤더의 토론 정보
export const ChatHeaderDiscussion = css`
  margin-left: 15px;
  color: #3182ce;
  font-size: 0.9em;
  font-weight: 500;
`;

// 🆕 채팅 공지의 토론 활성 상태
export const DiscussionAnnouncementActive = css`
  margin-top: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #fef5e7, #fed7aa);
  border-radius: 6px;
  border-left: 3px solid #f6ad55;
  font-size: 14px;
  color: #c05621;
  font-weight: 500;
`;

// 🆕 토론 정보 박스 (오른쪽 사이드바)
export const DiscussionInfoBox = css`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

// 🆕 토론 정보 내용
export const DiscussionInfoContent = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 🆕 토론 정보 제목
export const DiscussionInfoTitle = css`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;

// 🆕 토론 정보 주제
export const DiscussionInfoTopic = css`
  font-size: 14px;
  color: #4a5568;
  padding: 8px;
  background: linear-gradient(135deg, #ebf8ff, #bee3f8);
  border-radius: 6px;
  border-left: 3px solid #3182ce;
`;

// 🆕 토론 정보 타이머
export const DiscussionInfoTimer = css`
  font-size: 18px;
  font-weight: bold;
  color: #e53e3e;
  text-align: center;
  padding: 10px;
  background: linear-gradient(135deg, #fed7d7, #feb2b2);
  border-radius: 8px;
  border: 1px solid #fc8181;
`;