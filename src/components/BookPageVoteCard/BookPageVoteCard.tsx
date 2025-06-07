import { getVoteListResponse } from "apis/types/vote";
import Button from "../../components/Button/Button";
import VoteBar from "../../components/VoteBar/VoteBar";
import {
  voteFrame,
  voteDiv,
  voteTextWrapper,
  voteFrame2,
  voteOverlapGroupWrapper,
  mainContainer,
  selectedVoteButton,
} from "./BookPageVoteCard.style";
import usePostVote from "apis/hooks/vote/usePostVote";
import useGetUserVoteAnswer from "apis/hooks/vote/useGetUserVoteAnswer";
import { useNavigate } from "react-router-dom";

interface BookPageVoteCardProps {
  vote: getVoteListResponse;
  refetchVotes?: () => void;
}

const BookPageVoteCard: React.FC<BookPageVoteCardProps> = ({
  vote,
  refetchVotes,
}) => {
  const { voteId, title, agreeCount, disagreeCount } = vote;
  const total = agreeCount + disagreeCount;
  const agreePercent = total === 0 ? 0 : Math.round((agreeCount / total) * 100);
  const disagreePercent = total === 0 ? 0 : 100 - agreePercent;

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const { data: userVoteData, refetch: refetchUserVoteAnswer } =
    useGetUserVoteAnswer(voteId, { enabled: isLoggedIn });
  const userAnswered = userVoteData?.data ?? null;

  const { mutate: submitVote } = usePostVote();

  const handleVote = (answered: boolean) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      window.scrollTo(0, 0);
      return;
    }

    submitVote(
      { voteId: Number(voteId), answered },
      {
        onSuccess: () => {
          alert("투표가 완료되었습니다.");
          refetchUserVoteAnswer?.();
          refetchVotes?.();
        },
        onError: () => {
          alert("투표 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <div css={mainContainer}>
      <div css={voteFrame}>
        <div css={voteDiv}>
          <p css={voteTextWrapper}>{title}</p>
          <VoteBar leftPercent={agreePercent} rightPercent={disagreePercent} />
        </div>
        <div css={voteFrame2}>
          <div css={voteOverlapGroupWrapper}>
            <Button
              text={"찬성"}
              type="voteOption"
              onClick={() => handleVote(true)}
              disabled={userAnswered === true}
              css={userAnswered === true ? selectedVoteButton : undefined}
            />
          </div>
          <div css={voteOverlapGroupWrapper}>
            <Button
              text={"반대"}
              type="voteOption"
              onClick={() => handleVote(false)}
              disabled={userAnswered === false}
              css={userAnswered === false ? selectedVoteButton : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPageVoteCard;
