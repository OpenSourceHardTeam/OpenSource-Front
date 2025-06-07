import React from "react";
import * as styles from "./BookCard.style";
import { BookData } from "../../apis/hooks/Books/useBooks";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  bookData: BookData;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ bookData, onClick }) => {
  const { bookId, bookImageUrl, bookTitle, bookAuthor } = bookData;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    // 책 상세 페이지로 이동

    console.log("책 상세보기 클릭 - bookId:", bookId);
    navigate(`/bookinfo/${bookId}`);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 카드 클릭 시에도 상세 페이지로 이동 (선택사항)Add commentMore actions
      handleDetailClick();
    }
  };

  return (
    <div css={styles.bookCardContainer} onClick={handleCardClick}>
      <div css={styles.contentContainer}>
        <img
          src={bookImageUrl}
          alt={bookTitle}
          css={styles.bookImage}
          onError={(e) => {
            // 이미지 로드 실패시 기본 이미지로 변경
            const target = e.target as HTMLImageElement;
            target.src = "/default-book-image.png";
          }}
        />
        <div css={styles.titleContainer}>
          <h2 css={styles.bookTitle}>{bookTitle}</h2>
          <p css={styles.bookAuthor}>{bookAuthor}</p>
        </div>
      </div>

      <div css={styles.actionContainer}>
        <div
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
            handleDetailClick(); // 상세 페이지로 이동만 실행
          }}
        ></div>
      </div>
    </div>
  );
};

export default BookCard;