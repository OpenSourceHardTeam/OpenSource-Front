import BookPageVoteCard from "@components/BookPageVoteCard/BookPageVoteCard";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";
import { line, PlusBtn } from "@assets/index";
import { Modal } from "@components/index";
import { useState } from "react";

const VoteSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section id="vote" css={styles.contentSection}>
      <div css={styles.titleContainer}>
        <h3 css={textStyles.sectionTitle}>투표</h3>
        <PlusBtn css={styles.iconStyle} onClick={handleOpenModal} />
      </div>
      <img css={styles.dividerLine} src={line} alt="구분선" />
      <div css={styles.voteContainer}>
        <BookPageVoteCard />
      </div>

      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </section>
  );
};

export default VoteSection;
