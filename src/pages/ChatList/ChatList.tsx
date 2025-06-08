import { ChatingCard } from "@components/index";
import {
  ActivePageButton,
  ChatListContainer,
  Container,
  MainContainer,
  PageButton,
  PaginationContainer,
  TitleContainer,
} from "./ChatList.style";
import { useState } from "react";
import { useBooks } from "../../apis/hooks/Books/useBooks"; 

const CARDS_PER_PAGE = 7;

const ChatList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { bookList, loading, error } = useBooks(); // API 데이터 가져오기

  // 로딩 상태 처리
  if (loading) {
    return (
      <div css={MainContainer}>
        <div css={Container}>
          <p>채팅방 목록</p>
          <div css={TitleContainer}>
            <p>책 정보를 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div css={MainContainer}>
        <div css={Container}>
          <p>채팅방 목록</p>
          <div css={TitleContainer}>
            <p>오류가 발생했습니다: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 책 데이터가 없는 경우 처리
  if (!bookList || bookList.length === 0) {
    return (
      <div css={MainContainer}>
        <div css={Container}>
          <p>채팅방 목록</p>
          <div css={TitleContainer}>
            <p>등록된 책이 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(bookList.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentChats = bookList.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div css={MainContainer}>
      <div css={Container}>
        <p>채팅방 목록</p>
        <div css={TitleContainer}>
          <p>다양한 책에 대한 토론 채팅방에 참여하세요.</p>
        </div>
        <div css={ChatListContainer}>
          {currentChats.map((book) => (
            <ChatingCard key={book.bookId} bookData={book} />
          ))}
        </div>

        <div css={PaginationContainer}>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                css={page === currentPage ? ActivePageButton : PageButton}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;