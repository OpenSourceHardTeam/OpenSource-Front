import { ChatingCard } from "@components/index";
import {
  ActivePageButton,
  ChatListContainer,
  Container,
  MainContainer,
  PageButton,
  PaginationContainer,
  TitleContainer,
} from "./ChatList.style";
import { useState } from "react";

const CHAT_LIST = new Array(50).fill(null);

const CARDS_PER_PAGE = 7;

const ChatList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CHAT_LIST.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentChats = CHAT_LIST.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div css={MainContainer}>
      <div css={Container}>
        <p>채팅방 목록</p>
        <div css={TitleContainer}>
          <p>다양한 책에 대한 토론 채팅방에 참여하세요.</p>
        </div>
        <div css={ChatListContainer}>
          {currentChats.map((_, index) => (
            <ChatingCard key={startIndex + index} />
          ))}
        </div>

        <div css={PaginationContainer}>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                css={page === currentPage ? ActivePageButton : PageButton}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
