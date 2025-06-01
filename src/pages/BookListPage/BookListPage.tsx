import "./BookListPage.style";
import BookCard from "../../components/BookCard/BookCard";
import "./BookListPage.style";
import {
  ActivePageButton,
  ChatListContainer,
  Container,
  MainContainer,
  PageButton,
  PaginationContainer,
  TitleContainer,
  ChatListContainerLoadingError,
  ChatListContainerError,
} from "./BookListPage.style";
import { useState } from "react";
import { useBooks } from "../../apis/hooks/Books/useBooks";

const BOOK_LIST = new Array(50).fill(null);

const CARDS_PER_PAGE = 9;

const BookListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { bookList, loading, error, refetch } = useBooks();

  const totalPages = Math.ceil(bookList.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentBooks = bookList.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 로딩 상태 렌더링
  const renderLoading = () => (
    <div css={ChatListContainerLoadingError}>책 목록을 불러오는 중...</div>
  );

  // 에러 상태 렌더링
  const renderError = () => (
    <div css={ChatListContainerError}>
      오류: {error}
      <button
        onClick={refetch}
        style={{
          padding: "8px 16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );

  // 책 목록 렌더링
  const renderBookList = () => (
    <>
      <div css={ChatListContainer}>
        {currentBooks.map((book) => (
          <BookCard key={book.bookId} bookData={book} />
        ))}
      </div>

      {totalPages > 1 && (
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
      )}
    </>
  );

  return (
    <div css={MainContainer}>
      <div css={Container}>
        <p>도서 목록</p>
        <div css={TitleContainer}>
          <p>책에 대한 상세정보를 확인하세요.</p>
        </div>

        {loading && renderLoading()}
        {error && renderError()}
        {!loading && !error && renderBookList()}
      </div>
    </div>
  );
};

export default BookListPage;
