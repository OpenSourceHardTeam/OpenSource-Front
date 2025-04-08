import { css } from "@emotion/react";

export const MainContainer = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 80px 200px 100px 200px;
`;

export const Container = css`
  display: flex;
  flex-direction: column;
  font-size: 40px;
  font-weight: 700;
  color: #7b9acc;
  gap: 65px;
`;

export const BookListContainer = css`
  display: flex;
  flex-direction: row;
  gap: 110px;
  padding: 0px 25px;
`;

export const BookContainer = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #0e2624;
  font-size: 24px;
`;

export const TrendContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
`;

export const BookInfoWrapper = css`
  width: 498px;
  display: flex;
  flex-direction: column;
  gap: 86px;
`;

export const BookImage = css`
  width: 206.75px;
  height: 300px;
  border-radius: 11px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TitleAuthorWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const BookTitle = css`
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  color: #0e2624;
`;

export const BookAuthor = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #3f4756;
`;

export const BottomWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

export const ParticipantText = css`
  font-size: 24px;
  font-weight: 400;
  color: #666666;
`;
