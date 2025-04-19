import { ChatingCard } from "@components/index";
import {
  ChatListContainer,
  Container,
  MainContainer,
  TitleContainer,
} from "./ChatList.style";

const ChatList: React.FC = () => {
  return (
    <div css={MainContainer}>
      <div css={Container}>
        <p>채팅방 목록</p>
        <div css={TitleContainer}>
          <p>다양한 책에 대한 토론 채팅방에 참여하세요.</p>
        </div>
        <div css={ChatListContainer}>
          <ChatingCard />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
