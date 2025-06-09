import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";

interface BookHeaderProps {
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
}

// const formatDate = (dateString: string) => {
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("ko-KR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   } catch {
//     return dateString;
//   }
// };

const BookHeader: React.FC<BookHeaderProps> = ({
  title,
  author,
  publisher,
  publishDate,
}) => (
  <div css={styles.bookHeader}>
    <h1 css={textStyles.bookTitle}>{title}</h1>
    <h2 css={textStyles.bookAuthor}>{author}</h2>
    <p css={textStyles.bookPublisher}>
      {publisher} | {publishDate}

    </p>
  </div>
);

export default BookHeader;
