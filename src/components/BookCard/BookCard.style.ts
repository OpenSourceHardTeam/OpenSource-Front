import { css } from "@emotion/react";

export const bookCardContainer = css`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const imageContainer = css`
  min-width: 120px;
  width: 120px;
  height: 160px;
  margin-right: 20px;
  overflow: hidden;
`;

export const bookImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 5px 0;
`;

export const bookTitle = css`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #333;
`;

export const bookAuthor = css`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #666;
`;

export const actionContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 20px;
`;

export const joinButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5b7cfa;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4565e6;
  }
`;

export const arrowIcon = css`
  margin-left: 8px;
  font-size: 14px;
`;