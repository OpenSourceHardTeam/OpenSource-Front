import { Colors } from "./BookInfoPageText.style";
import { css } from "@emotion/react";

// 레이아웃 관련 스타일 컴포넌트
export const BookInfoFrame = css`
  display: flex;
  flex-direction: column;
  width: 1040px;
  height: 2815px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 80px 200px 100px;
  position: relative;
`;

export const BookInfoDiv = css`
  display: flex;
  flex-direction: column;
  width: 1040px;
  align-items: flex-start;
  gap: 72px;
  position: relative;
  flex: 0 0 auto;
`;

export const BookInfoGroup = css`
  position: relative;
  width: 588px;
  height: 37px;
`;

export const BookInfoDiv2 = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 70px 82px;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
`;

// 책 테두리
export const BookInfoView = css`
  display: flex;
  width: 310px;
  height: 400px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 50px 51px;
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  border: 2px solid;
  border-color: ${Colors.borderColor};
`;

// 책 이미지
export const BookInfoImage = css`
  position: relative;
  width: 214.75px;
  height: 308px;
  margin-bottom: -8px;
  margin-left: -3.38px;
  margin-right: -3.38px;
  object-fit: cover;
`;

export const BookInfoDiv3 = css`
  display: flex;
  flex-direction: column;
  width: 498px;
  align-items: flex-start;
  gap: 29px;
  position: relative;
`;

export const BookInfoDiv4 = css`
  display: flex;
  flex-direction: column;
  width: 143px;
  align-items: flex-start;
  gap: 9px;
  position: relative;
  flex: 0 0 auto;
`;

export const BookInfoGroupWrapper = css`
  position: relative;
  width: 1040px;
  height: 214.36px;
`;

// 채팅방 참여하기, 채팅방 규칙
export const BookInfoChatRoomJoinWrapper = css`
  display: flex;
  flex-direction: column;
  width: 1042px;
  height: 216px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 25px 40px;
  position: relative;
  top: -1px;
  left: -1px;
  border-radius: 5px;
  border: 1px solid;
  border-color: ${Colors.borderColor};
`;

export const BookInfoChatRoomJoin = css`
  width: 100%;
`;

export const BookInfoDiv5 = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 110px;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
`;

export const BookInfoDiv6 = css`
  display: flex;
  flex-direction: column;
  width: 393px;
  align-items: flex-start;
  gap: 14px;
  position: relative;
`;

export const BookInfoDiv7 = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: flex-start;
  gap: 21px;
  position: relative;
`;

export const BookInfoDiv8 = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
`;

// 채팅방 참여하기 버튼 테두리
export const BookInfoDivWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px 32px;
  position: relative;
  cursor: pointer;
`;

// 책 소개, 투표, 출판사 서평 큰 틀
export const BookInfoDiv9 = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 72px;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
`;

export const BookInfoDiv10 = css`
  display: flex;
  flex-direction: column;
  width: 990.34px;
  align-items: flex-start;
  gap: 11px;
  position: relative;
  flex: 0 0 auto;
`;

// 책 소개 투표 출판사 서평 틀
export const BookInfoDiv11 = css`
  display: inline-flex;
  align-items: center;
  gap: 50px;
  position: relative;
  flex: 0 0 auto;
`;

// bar line
export const BookInfoLine = css`
  position: relative;
  width: 1000px;
  height: 1px;
  margin-bottom: -1px;
`;

export const BookInfoDescriptionWrapper = css`
  position: relative;
  width: 1062.6px;
  height: 162px;
  margin-right: -22.6px;
`;

export const BookInfoDescription = css`
  display: flex;
  flex-direction: column;
  width: 1063px;
  align-items: flex-start;
  gap: 20px;
  position: relative;
`;

export const BookInfoDescriptionText = css`
  position: relative;
  width: 521px;
  height: 95px;
`;

export const BookInfoDiv12 = css`
  display: flex;
  flex-direction: column;
  height: 689px;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  align-self: stretch;
  width: 100%;
`;

export const BookInfoDiv13 = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
`;

export const BookInfoView2 = css`
  position: relative;
  align-self: stretch;
  width: 100%;
  height: 588px;
`;

export const BookInfoDiv14 = css`
  display: flex;
  flex-direction: column;
  width: 1040px;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const BookInfoDiv15 = css`
  display: flex;
  flex-direction: column;
  width: 950px;
  align-items: flex-start;
  gap: 40px;
  position: absolute;
  top: 71px;
  left: 29px;
`;

// 투표 틀
export const BookInfoElement = css`
  display: flex;
  flex-direction: column;
  height: 142px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 22px 30px;
  position: relative;
  align-self: stretch;
  width: 100%;
  margin-top: -1px;
  margin-left: -1px;
  margin-right: -1px;
  background-color: #fcf6f5;
  border-radius: 20px;
  border: 2px solid;
  border-color: ${Colors.borderColor};
`;
