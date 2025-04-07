import {
  Container,
  ContentContainer,
  ContentHeader,
  ImageStyle,
} from "./PopularVoteCard.style";
import book from "../../assets/img/book.png";
import Button from "@components/Button";
import VoteBar from "@components/VoteBar/VoteBar";

const PopularVoteCard: React.FC = () => {
  return (
    <div css={Container}>
      <img src={book} alt={book} css={ImageStyle} />
      <div css={ContentContainer}>
        <div css={ContentHeader}>
          <p>소설은 현대 사회에서 어떤 역할을 하는가?</p>
          <Button text={"투표하러 가기"} />
        </div>
        <VoteBar leftPercent={36} rightPercent={64} />
      </div>
    </div>
  );
};

export default PopularVoteCard;
