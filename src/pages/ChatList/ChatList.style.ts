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
  gap: 30px;
`;

export const TitleContainer = css`
  color: #666666;
  font-size: 24px;
  font-weight: 400;
`;

export const ChatListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 65px;
  width: 1040px;
`;
