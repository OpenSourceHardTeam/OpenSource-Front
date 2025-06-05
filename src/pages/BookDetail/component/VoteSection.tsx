import BookPageVoteCard from "@components/BookPageVoteCard/BookPageVoteCard";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";
import { line, PlusBtn } from "@assets/index";
import { Modal } from "@components/index";
import { useState } from "react";
import { useBookDetail } from "apis/hooks/BookDetail/useBookDetail";
import { useParams } from "react-router-dom";
import useVoteList from "apis/hooks/vote/useGetVoteList";

const VoteSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { bookId } = useParams<{ bookId: string }>();
  const { bookDetail } = useBookDetail(bookId);

  const {
    data: voteResponse,
    isLoading,
    refetch: refetchVotes,
  } = useVoteList({
    bookId: Number(bookId),
    sortBy: "createAt",
  });
  const votes = voteResponse?.data ?? [];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section id="vote" css={styles.contentSection}>
      <div css={styles.titleContainer}>
        <h3 css={textStyles.sectionTitle}>투표</h3>
        <PlusBtn css={styles.iconStyle} onClick={handleOpenModal} />
      </div>
      <img css={styles.dividerLine} src={line} alt="구분선" />
      {isLoading ? (
        <p>불러오는 중...</p>
      ) : (
        votes.map((vote) => (
          <BookPageVoteCard
            key={vote.voteId}
            vote={vote}
            refetchVotes={refetchVotes}
          />
        ))
      )}
      {isModalOpen && bookDetail && (
        <Modal
          onClose={handleCloseModal}
          bookId={bookDetail.bookId}
          refetchVotes={refetchVotes}
        />
      )}
    </section>
  );
};

export default VoteSection;
