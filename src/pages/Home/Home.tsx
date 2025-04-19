import {
  BookAuthor,
  BookContainer,
  BookImage,
  BookInfoWrapper,
  BookListContainer,
  BookTitle,
  BottomWrapper,
  Container,
  MainContainer,
  ParticipantText,
  TitleAuthorWrapper,
  TrendContainer,
} from "./Home.style";
import { Button, PopularVoteCard } from "components";
import { border, book } from "@assets/img";

const Home: React.FC = () => {
  const books = [
    { id: 1, title: "소년이 온다", img: book },
    { id: 2, title: "소년이 온다", img: book },
    { id: 3, title: "소년이 온다", img: book },
    { id: 4, title: "소년이 온다", img: book },
  ];

  return (
    <>
      <img
        src={border}
        alt={border}
        style={{ width: "100%", /*marginTop: "64px"*/ }}
      />
      <div css={MainContainer}>
        <div css={Container}>
          <p>WEEKLY BEST</p>
          <div css={BookListContainer}>
            {books.map((bookItem) => (
              <div css={BookContainer} key={bookItem.id}>
                <img src={bookItem.img} alt={bookItem.title} />
                <p>{bookItem.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div css={Container}>
          <p>POPULAR VOTE</p>
          <PopularVoteCard />
          <PopularVoteCard />
          <PopularVoteCard />
        </div>
        <div css={Container}>
          <p>TRENDING NOW</p>
          <div css={TrendContainer}>
            <img src={book} css={BookImage} />
            <div css={BookInfoWrapper}>
              <div css={TitleAuthorWrapper}>
                <div css={BookTitle}>소년이 온다</div>
                <div css={BookAuthor}>한강</div>
              </div>
              <div css={BottomWrapper}>
                <p css={ParticipantText}>현재 256명이 채팅방에 참여했어요</p>
                <Button text={"채팅방 입장하기"} type={"bigChatRoomJoin"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
