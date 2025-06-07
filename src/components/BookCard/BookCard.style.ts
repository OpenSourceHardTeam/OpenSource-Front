import { css } from "@emotion/react";

export const bookCardContainer = css`
  display: flex;
  width: 320px;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 15px 20px;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const imageContainer = css`
  min-width: 130px;
  width: 130px;
  height: 170px;
  margin-right: 20px;
  overflow: hidden;
`;

export const bookImage = css`
  width: 150px;
  height: 204px;

  border-radius: 8px;
`;

export const contentContainer = css`
  width: 260px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: hidden;
  align-items: center;
`;

export const bookTitle = css`
  font-size: 20px;
  font-weight: 700;

  color: #333;
`;

export const titleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const bookAuthor = css`
  font-size: 15px;
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
