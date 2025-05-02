import {
  ArrowButton,
  BookAuthor,
  BookContainer,
  BookImage,
  BookInfoWrapper,
  BookListContainer,
  BookListWrapper,
  BookTitle,
  BottomWrapper,
  Container,
  MainContainer,
  ParticipantText,
  TitleAuthorWrapper,
  TrendContainer,
} from "./Home.style";
import { Button, PopularVoteCard } from "components";
import { border, book } from "@assets/index";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 275;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(updateScrollButtons, 300);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const books = [
    { id: 1, title: "소년이 온다", img: book },
    { id: 2, title: "소년이 온다", img: book },
    { id: 3, title: "소년이 온다", img: book },
    { id: 4, title: "소년이 온다", img: book },
    { id: 5, title: "소년이 온다", img: book },
    { id: 6, title: "소년이 온다", img: book },
    { id: 7, title: "소년이 온다", img: book },
    { id: 8, title: "소년이 온다", img: book },
  ];

  return (
    <>
      <img src={border} alt={border} style={{ width: "100%" }} />
      <div css={MainContainer}>
        <div css={Container}>
          <p>WEEKLY BEST</p>
          <div css={BookListWrapper}>
            <button
              css={ArrowButton("left", !canScrollLeft)}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <FaChevronLeft />
            </button>
            <div css={BookListContainer} ref={scrollRef}>
              {books.map((bookItem) => (
                <div css={BookContainer} key={bookItem.id}>
                  <img src={bookItem.img} alt={bookItem.title} />
                  <p>{bookItem.title}</p>
                </div>
              ))}
            </div>
            <button
              css={ArrowButton("right", !canScrollRight)}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <FaChevronRight />
            </button>
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
