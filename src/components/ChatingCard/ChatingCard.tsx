import React from "react";
import {
  BookImage,
  BookInfo,
  Container,
  ContentContainer,
  InfoContainer,
  textStyle,
} from "./ChatingCard.style";
import { book } from "@assets/index";
import Button from "@components/Button/Button";

const ChatingCard: React.FC = () => {
  return (
    <div css={Container}>
      <img src={book} css={BookImage} />
      <div css={ContentContainer}>
        <div css={InfoContainer}>
          <div css={BookInfo}>
            <div css={textStyle("title")}>소년이 온다</div>
            <div css={textStyle("author")}>한강</div>
          </div>
          <div css={textStyle("topic")}>
            현재 토론 : 개인의 자유와 사회적 안정의 균형
          </div>
          <div css={textStyle("activity")}>마지막 활동: 5분 전</div>
        </div>
        <Button text={"채팅방 참여하기"} type={"smallChatRoomJoin"} />
      </div>
    </div>
  );
};

export default ChatingCard;
