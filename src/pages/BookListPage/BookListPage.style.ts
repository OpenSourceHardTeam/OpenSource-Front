import { css } from "@emotion/react";

export const MainContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  padding: 80px 0px 100px 0px;
  margin: 0 auto;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
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

export const ChatListContainerLoadingError = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: #666;
`;

export const ChatListContainerError = css`
  display: flex;
  flex-direction: columns;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 16px;
  font-size: 18px;
  color: #e74c3c;
`;
