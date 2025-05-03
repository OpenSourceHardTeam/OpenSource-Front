import "./BookListPage.style"
import BookCard from "../../components/BookCard/BookCard"
import {
  ActivePageButton,
  ChatListContainer,
  Container,
  MainContainer,
  PageButton,
  PaginationContainer,
  TitleContainer,
} from "./BookListPage.style";
import { useState } from "react";

const BOOK_LIST = new Array(50).fill(null);

const CARDS_PER_PAGE = 7;

const BookListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(BOOK_LIST.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentChats = BOOK_LIST.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div css={MainContainer}>
      <div css={Container}>
        {/* 페이지 상단 */}
        <p>도서 목록</p>
        <div css={TitleContainer}>
          <p>책에 대한 상세정보를 확인하세요.</p>
        </div>
        <div css={ChatListContainer}>
          
          {currentChats.map((_, index) => (
            <BookCard key={startIndex + index} />
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

export default BookListPage;
