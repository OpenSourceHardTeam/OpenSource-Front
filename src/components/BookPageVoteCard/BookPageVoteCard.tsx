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
} from "./BookPageVoteCard.style";
import usePostVote from "apis/hooks/vote/usePostVote";

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

  const { mutate: submitVote } = usePostVote();

  const handleVote = (answered: boolean) => {
    console.log("보내는 voteId:", voteId, typeof voteId);

    submitVote(
      { voteId: Number(voteId), answered },
      {
        onSuccess: () => {
          alert("투표가 완료되었습니다.");
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
            />
          </div>
          <div css={voteOverlapGroupWrapper}>
            <Button
              text={"반대"}
              type="voteOption"
              onClick={() => handleVote(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPageVoteCard;
