import {
  Container,
  ContentContainer,
  ContentHeader,
  ImageStyle,
} from "./PopularVoteCard.style";
import Button from "@components/Button/Button";
import VoteBar from "@components/VoteBar/VoteBar";
import { getAllVoteListResponse } from "apis/types/vote";
import { useNavigate } from "react-router-dom";

interface Props {
  vote: getAllVoteListResponse;
}

const PopularVoteCard: React.FC<Props> = ({ vote }) => {
  const navigate = useNavigate();
  const total = vote.agreeCount + vote.disagreeCount;

  let agreePercent = 0;
  let disagreePercent = 0;

  if (total > 0) {
    agreePercent = Math.round((vote.agreeCount / total) * 100);
    disagreePercent = 100 - agreePercent;
  }

  return (
    <div css={Container}>
      <img src={vote.bookImageUrl} alt="book" css={ImageStyle} />
      <div css={ContentContainer}>
        <div css={ContentHeader}>
          <p>{vote.title}</p>
          <Button
            text={"투표하러 가기"}
            type={"smallChatRoomJoin"}
            onClick={() => navigate(`/bookinfo/${vote.bookId}#vote`)}
          />
        </div>
        <VoteBar leftPercent={agreePercent} rightPercent={disagreePercent} />
      </div>
    </div>
  );
};

export default PopularVoteCard;
