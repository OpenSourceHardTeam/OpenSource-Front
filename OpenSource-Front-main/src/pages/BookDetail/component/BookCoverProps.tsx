import * as styles from "../BookInfoPage.style";

interface BookCoverProps {
  imageUrl: string;
  title: string;
}

const BookCover: React.FC<BookCoverProps> = ({ imageUrl, title }) => (
  <div css={styles.bookCover}>
    <img
      css={styles.bookImage}
      src={imageUrl}
      alt={title}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/default-book-image.png";
      }}
    />
  </div>
);

export default BookCover;
