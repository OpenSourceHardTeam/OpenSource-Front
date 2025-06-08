import { line } from "@assets/index";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";

interface BookDescriptionProps {
  description: string;
}

const BookDescription: React.FC<BookDescriptionProps> = ({ description }) => (
  <section id="bookdes" css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>책 소개</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.descriptionText}>{description}</p>
  </section>
);

export default BookDescription;
