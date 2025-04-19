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
  margin-top: 50px;
`;

export const PaginationContainer = css`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
`;

export const PageButton = css`
  background: none;
  border: none;
  color: #aaa;
  font-size: 16px;
  cursor: pointer;
  padding: 6px 12px;
`;

export const ActivePageButton = css`
  background: #7b9acc;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  padding: 6px 12px;
  cursor: pointer;
`;
