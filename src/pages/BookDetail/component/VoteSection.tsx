import BookPageVoteCard from "@components/BookPageVoteCard/BookPageVoteCard";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";
import { line, PlusBtn } from "@assets/index";
import { Modal } from "@components/index";
import { useState } from "react";
import { useBookDetail } from "apis/hooks/BookDetail/useBookDetail";
import { useNavigate, useParams } from "react-router-dom";
import useVoteList from "apis/hooks/vote/useGetVoteList";

const VoteSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIdString = localStorage.getItem("userId");
  const myUserId = userIdString !== null ? Number(userIdString) : null;

  const { bookId } = useParams<{ bookId: string }>();
  const { bookDetail } = useBookDetail(bookId);
  const navigate = useNavigate();

  const {
    data: voteResponse,
    isLoading,
    refetch: refetchVotes,
  } = useVoteList({
    bookId: Number(bookId),
    sortBy: "createAt",
  });
  const votes = voteResponse?.data ?? [];

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      alert("로그인 후에 투표를 등록할 수 있어요.");
      navigate("/login");
      window.scrollTo(0, 0);

      return;
    }
    setIsModalOpen(true);
  };
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
            isMine={myUserId !== null && vote.userId === myUserId} // ✅ 안전하게 비교
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
