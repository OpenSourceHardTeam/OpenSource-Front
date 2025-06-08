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
  TitleAuthorWrapper,
  TrendContainer,
} from "./Home.style";
import { Button, PopularVoteCard } from "components";
import { border } from "@assets/index";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import { useBooks, BookData } from "apis/hooks/Books/useBooks";
import { useNavigate } from "react-router-dom";
import useGetAllVoteList from "apis/hooks/vote/useGetAllVoteList";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  

  const { bookList, loading, error } = useBooks();

  const [randomBook, setRandomBook] = useState<BookData | null>(null);
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

  const handleJoinChatRoom = () => {
    navigate("/chat", {
      state: {
        selectedBook: randomBook,
        autoJoin: true
      }
    });
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

      // 랜덤 책 선택
      const randomIndex = Math.floor(Math.random() * Math.min(bookList.length, 50));
      setRandomBook(bookList[randomIndex]);
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
        {randomBook && (
        <div css={Container}>
          <p>오늘의 추천 책</p>
          <div css={TrendContainer}>
            <img src={randomBook.bookImageUrl} css={BookImage} />
            <div css={BookInfoWrapper}>
              <div css={TitleAuthorWrapper}>
                <div css={BookTitle}>{randomBook.bookTitle}</div>
                <div css={BookAuthor}>{randomBook.bookAuthor}</div>
              </div>
              <div css={BottomWrapper}>
                <Button 
                text={"채팅방 입장하기"} 
                type={"bigChatRoomJoin"} 
                onClick={handleJoinChatRoom}
                />
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default Home;
