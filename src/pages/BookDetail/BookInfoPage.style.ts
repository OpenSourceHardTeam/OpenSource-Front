import { css } from "@emotion/react";
import { Colors } from "./BookInfoPageText.style";

export const MainContainer = css`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 0 auto;
  padding: 80px 0px 100px 0px;
`;

// 전체 컨테이너
export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 72px;
`;

// 페이지 헤더
export const pageHeader = css`
  width: 588px;
  margin-bottom: 35px;
`;

// 책 정보 섹션
export const bookInfoSection = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 82px;
`;

// 책 커버
export const bookCover = css`
  display: flex;
  width: 310px;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 20px;
  border: 2px solid ${Colors.borderColor};
  padding: 50px 51px;
`;

export const bookImage = css`
  width: 214px;
  height: 308px;
  object-fit: cover;
`;

// 책 정보 헤더
export const bookHeader = css`
  display: flex;
  flex-direction: column;
  width: 498px;
  gap: 9px;
  margin-bottom: 29px;
`;

// 책 상세정보
export const bookDetails = css`
  display: flex;
  flex-direction: column;
  width: 498px;
`;

// 채팅방 섹션
export const chatRoomSection = css`
  display: flex;
  width: 1040px;
  height: 215px;
  padding: 25px 40px;
  border-radius: 5px;
  border: 1px solid ${Colors.borderColor};
  background-color: white;
  justify-content: space-between;
  gap: 110px;
`;

export const chatRoomInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 393px;
  gap: 14px;
`;

export const chatRoomRules = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
`;

// 콘텐츠 컨테이너
export const contentContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 72px;
`;

// 탭 네비게이션
export const tabNavigation = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 11px;
`;

export const tabList = css`
  display: flex;
  gap: 50px;
`;

// 구분선
export const dividerLine = css`
  width: 100%;
  height: 1px;
`;

// 콘텐츠 섹션
export const contentSection = css`
  display: flex;
  flex-direction: column;
  width: 1000px;
  gap: 20px;
  margin-bottom: 50px;
`;

// 투표 컨테이너
export const voteContainer = css``;

export const buttonStyle = css`
  margin-top: 5px;
`;

export const titleContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const iconStyle = css`
  width: 30px;
  height: 30px;
`;
