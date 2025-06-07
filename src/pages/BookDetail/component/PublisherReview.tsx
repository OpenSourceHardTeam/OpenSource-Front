import { line } from "@assets/index";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";

interface PublisherReviewProps {
  review: string;
}

const PublisherReview: React.FC<PublisherReviewProps> = ({ review }) => (
  <section id="review" css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>출판사 서평</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.reviewText}>{review}</p>
  </section>
);

export default PublisherReview;
