import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookImage,
  BookInfo,
  Container,
  ContentContainer,
  InfoContainer,
  textStyle,
} from "./ChatingCard.style";
import Button from "@components/Button/Button";
import { BookData, useBooks } from "../../apis/hooks/Books/useBooks";
import { getChatRoomUsers } from "../../apis/hooks/chat/useChatApi";

interface ChatingCardProps {
  bookData: BookData; // 개별 책 데이터를 props로 받음
}

// ChatPage.tsx와 동일한 로직: 책 배열 인덱스 → 채팅방 ID 매핑 (110-159)
const getBookChatRoomId = (book: BookData, bookList: BookData[]): number => {
  const bookIndex = bookList.findIndex(b => b.bookId === book.bookId);
  const chatroomId = bookIndex + 110; // 110부터 시작
  
  if (bookIndex === -1) {
    return 110; // 기본값을 110으로 변경
  }
  
  return chatroomId;
};

// 참여자 수를 가져오는 커스텀 훅
const useParticipantCount = (bookData: BookData) => {
  const [participantCount, setParticipantCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { bookList } = useBooks(); // 전체 책 목록 가져오기

  useEffect(() => {
    const fetchParticipantCount = async () => {
      if (!bookData || bookList.length === 0) {
        return;
      }

      setIsLoading(true);
      try {
        // 해당 책의 채팅방 ID 계산
        const chatroomId = getBookChatRoomId(bookData, bookList);
        
        // 채팅방 참여자 목록 가져오기
        const response = await getChatRoomUsers(chatroomId);
        
        let users = [];
        if (Array.isArray(response)) {
          users = response;
        } else if (response && typeof response === 'object') {
          users = Object.values(response);
        }
        
        setParticipantCount(users.length);
      } catch (error) {
        // 에러 시 0명으로 설정
        setParticipantCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipantCount();
  }, [bookData, bookList]);

  return { participantCount, isLoading };
};

const ChatingCard: React.FC<ChatingCardProps> = ({ bookData }) => {
  const navigate = useNavigate();
  const { participantCount, isLoading } = useParticipantCount(bookData);

  // 채팅방 참여하기 버튼 클릭 핸들러
  const handleJoinChatRoom = () => {
    // 책 정보와 함께 채팅방 페이지로 이동
    navigate("/chat", {
      state: {
        selectedBook: bookData,
        autoJoin: true // 자동 참여 플래그
      }
    });
  };

  return (
    <div css={Container}>
      <img 
        src={bookData.bookImageUrl}
        css={BookImage}
        alt={bookData.bookTitle}
      />
      <div css={ContentContainer}>
        <div css={InfoContainer}>
          <div css={BookInfo}>
            <div css={textStyle("title")}>{bookData.bookTitle}</div>
            <div css={textStyle("author")}>{bookData.bookAuthor}</div>
          </div>
          {/* <div css={textStyle("topic")}>
            현재 토론 : 개인의 자유와 사회적 안정의 균형
          </div> */}
          <div css={textStyle("activity")}>
            {isLoading 
              ? "참여자 확인 중..." 
              : `${participantCount}명 참여중`
            }
          </div>
        </div>
        <Button 
          text={"채팅방 참여하기"}
          type={"smallChatRoomJoin"}
          onClick={handleJoinChatRoom}
        />
      </div>
    </div>
  );
};

export default ChatingCard;