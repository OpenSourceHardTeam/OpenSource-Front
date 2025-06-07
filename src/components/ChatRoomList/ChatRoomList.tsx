import React from 'react';
import * as styles from '../../pages/Chat/ChatPage.style';

// 채팅방 타입 정의
export interface ChatRoom {
  id: number;
  title: string;
  category: string;
  participants: number;
  isActive?: boolean;
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
  onSelectRoom?: (roomId: number) => void;
  activeRoomId?: number;
  isLoading?: boolean;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ 
  rooms, 
  onSelectRoom, 
  activeRoomId,
  isLoading = false 
}) => {
  const handleRoomClick = (roomId: number) => {
    if (onSelectRoom) {
      onSelectRoom(roomId);
    }
  };

  if (isLoading) {
    return (
      <div css={styles.ChatRoomListContainer}>
        <h3 css={styles.HeaderText2}>참여중인 채팅방 목록</h3>
        <div css={styles.LoadingMessage}>채팅방 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div css={styles.ChatRoomListContainer}>
      <h3 css={styles.HeaderText2}>참여중인 채팅방 목록</h3>
      {rooms.length === 0 ? (
        <div css={styles.EmptyRoomMessage}>참여중인 채팅방이 없습니다.</div>
      ) : (
        rooms.map((room) => (
          <div 
            key={room.id} 
            css={[
              styles.BookingItem, 
              room.id === activeRoomId ? styles.ActiveBookingItem : undefined
            ]}
            onClick={() => handleRoomClick(room.id)}
          >
            <div css={styles.BookingContent}>
              <div css={styles.BookingLabel}>{room.title}</div>
              <div css={styles.BookingInfo}>{room.category}토론주제:</div>
              <div css={styles.BookingInfo}>참여:{room.participants}명</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatRoomList;