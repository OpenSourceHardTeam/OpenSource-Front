import React from "react";
import BD from "../../BD/BookData"; // BookData.ts 파일 경로
import * as styles from "./BookCard.style";
import { useNavigate } from "react-router-dom";

const BookCard: React.FC = () => {
  const navigate = useNavigate();
  // BookData에서 필요한 정보를 직접 가져옴
  const { image, title, author } = BD;

  const handleDetail = () => {
    navigate("/bookinfo");
  };

  return (
    <div css={styles.bookCardContainer} onClick={handleDetail}>
      <div css={styles.contentContainer}>
        <img src={image} alt={title} css={styles.bookImage} />
        <div css={styles.titleContainer}>
          <h2 css={styles.bookTitle}>{title}</h2>
          <p css={styles.bookAuthor}>{author}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
