import {
  ArrowButton,
  BookAuthor,
  BookContainer,
  BookImage,
  BookInfoWrapper,
  BookListContainer,
  BookListWrapper,
  BookTitle,
  BookTitleText,
  BottomWrapper,
  Container,
  imageStyle,
  MainContainer,
  ParticipantText,
  TitleAuthorWrapper,
  TrendContainer,
} from "./Home.style";
import { Button, PopularVoteCard } from "components";
import { border, book } from "@assets/index";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import { useBooks } from "apis/hooks/Books/useBooks";
import { useNavigate } from "react-router-dom";
import useGetAllVoteList from "apis/hooks/vote/useGetAllVoteList";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { bookList, loading, error } = useBooks();
  const {
    data: voteData,
    isLoading: voteLoading,
    error: voteError,
  } = useGetAllVoteList();

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

  useEffect(() => {
    if (!loading && bookList.length > 0) {
      updateScrollButtons();
    }
  }, [bookList, loading]);

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
              {loading ? (
                <p>로딩 중...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                bookList.slice(0, 30).map((bookItem) => (
                  <div
                    css={BookContainer}
                    key={bookItem.bookId}
                    onClick={() => navigate(`/bookinfo/${bookItem.bookId}`)}
                  >
                    <img
                      src={bookItem.bookImageUrl}
                      alt={bookItem.bookTitle}
                      css={imageStyle}
                    />
                    <p css={BookTitleText}>{bookItem.bookTitle}</p>
                  </div>
                ))
              )}
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
          {voteLoading ? (
            <p>로딩 중...</p>
          ) : voteError || !voteData?.data ? (
            <p>투표 정보를 불러오지 못했습니다.</p>
          ) : (
            voteData.data
              .slice(0, 5)
              .map((vote) => <PopularVoteCard key={vote.voteId} vote={vote} />)
          )}
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
