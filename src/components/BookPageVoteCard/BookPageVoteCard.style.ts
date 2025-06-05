import { css } from "@emotion/react";

export const mainContainer = css`
  width: 950px;
  height: 150px;
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  outline: 1px solid #d4d4d4;
  padding: 22px 30px;
  margin-top: 20px;
`;

export const voteFrame = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const voteDiv = css`
  width: 519px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  position: relative;
`;

export const voteTextWrapper = css`
  align-self: stretch;
  height: 22px;
  margin-top: -1px;
  font-weight: 700;
  color: #3f4756;
  font-size: 20px;
  white-space: nowrap;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
`;

export const voteFrame2 = css`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: relative;
`;

export const voteOverlapGroupWrapper = css`
  width: 252px;
  height: 38px;
  margin-right: -2px;
  position: relative;
`;
