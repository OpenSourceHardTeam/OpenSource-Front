import React from "react";
import Button from "../../components/Button/Button";
import BD from "../../BD/BookData"; // BookData.ts 파일 경로
import * as styles from "./BookCard.style";

interface BookCardProps {
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ onClick }) => {
  // BookData에서 필요한 정보를 직접 가져옴
  const { image, title, author } = BD;

  return (
    <div css={styles.bookCardContainer} onClick={onClick}>
      <div css={styles.contentContainer}>
        <img src={image} alt={title} css={styles.bookImage} />
        <div css={styles.titleContainer}>
          <h2 css={styles.bookTitle}>{title}</h2>
          <p css={styles.bookAuthor}>{author}</p>
        </div>
      </div>
      <div css={styles.actionContainer}>
        <Button
          text={"책 상세보기"}
          type={"smallChatRoomJoin"}
          css={styles.joinButton}
        />
      </div>
    </div>
  );
};

export default BookCard;
