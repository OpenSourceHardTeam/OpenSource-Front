import {
  BookContainer,
  Container,
  PopularVoteContainer,
  WeeklyBestContainer,
} from "./Home.style";
import book from "../../assets/img/book.png";
import { css } from "@emotion/react";

const Home: React.FC = () => {
  const books = [
    { id: 1, title: "소년이 온다", img: book },
    { id: 2, title: "소년이 온다", img: book },
    { id: 3, title: "소년이 온다", img: book },
    { id: 4, title: "소년이 온다", img: book },
  ];

  return (
    <main>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 80px;
        `}
      >
        <div css={WeeklyBestContainer}>
          <p>WEEKLY BEST</p>
          <div css={Container}>
            {books.map((bookItem) => (
              <div css={BookContainer} key={bookItem.id}>
                <img src={bookItem.img} alt={bookItem.title} />
                <p>{bookItem.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div css={PopularVoteContainer}></div>
      </div>
    </main>
  );
};

export default Home;
