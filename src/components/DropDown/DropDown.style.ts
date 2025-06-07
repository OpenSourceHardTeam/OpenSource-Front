import { css } from "@emotion/react";

export const dropdownStyle = css`
  position: absolute;
  top: calc(100%);
  right: 10px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  width: 160px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const containerStyle = (edit: boolean) => css`
  color: ${edit ? "#7B9ACC" : "#FF6767"};
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 15px;
  position: relative;

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    background-color: #d4d4d4;
    text-decoration: ${edit ? "none" : "underline"};
  }
`;

export const bodyStyle = css`
  height: 38px;
`;
