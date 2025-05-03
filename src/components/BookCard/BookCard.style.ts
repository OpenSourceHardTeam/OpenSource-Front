import { css } from "@emotion/react";

export const bookCardContainer = css`
  display: flex;
  width: 320px;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 25px 30px;
  gap: 40px;
`;

export const contentContainer = css`
  width: 260px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: hidden;
  align-items: center;
`;

export const bookImage = css`
  width: 120px;
  height: 174px;
  border-radius: 8px;
`;

export const titleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const bookTitle = css`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

export const bookAuthor = css`
  font-size: 18px;
  font-weight: 500;
  color: #666;
`;

export const actionContainer = css`
  display: flex;
  align-items: center;
`;

export const joinButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7b9acc;
  color: white;
  border: none;
  width: 260px;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(101, 126, 167);
  }
`;

export const arrowIcon = css`
  margin-left: 8px;
  font-size: 14px;
`;
