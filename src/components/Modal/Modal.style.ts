import { css } from "@emotion/react";

export const Backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const mainContainer = css`
  width: 760px;
  height: 448px;
  padding: 24px;
  border-radius: 8px;
  outline: 1px #cdd1d5 solid;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #393940;
  font-size: 16px;
  font-weight: 400;
  background-color: white;
`;
export const titleStyle = css`
  color: #7b9acc;
  font-size: 24px;
  font-weight: 700;
`;
export const topBox = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const iconStyle = css`
  height: 24px;
  width: 24px;
`;

export const buttonContainer = css`
  margin-top: 41px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
