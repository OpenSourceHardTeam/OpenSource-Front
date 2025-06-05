import {
  Container,
  ContentContainer,
  ContentHeader,
  ImageStyle,
} from "./PopularVoteCard.style";
import book from "../../assets/img/book.png";
import Button from "@components/Button/Button";
import VoteBar from "@components/VoteBar/VoteBar";
import { getAllVoteListResponse } from "apis/types/vote";

interface Props {
  vote: getAllVoteListResponse;
}

const PopularVoteCard: React.FC<Props> = ({ vote }) => {
  const total = vote.agreeCount + vote.disagreeCount;
  const agreePercent =
    total === 0 ? 0 : Math.round((vote.agreeCount / total) * 100);
  const disagreePercent = 100 - agreePercent;

  return (
    <div css={Container}>
      <img src={book} alt="book" css={ImageStyle} />
      <div css={ContentContainer}>
        <div css={ContentHeader}>
          <p>{vote.title}</p>
          <Button text={"투표하러 가기"} type={"smallChatRoomJoin"} />
        </div>
        <VoteBar leftPercent={agreePercent} rightPercent={disagreePercent} />
      </div>
    </div>
  );
};

export default PopularVoteCard;
