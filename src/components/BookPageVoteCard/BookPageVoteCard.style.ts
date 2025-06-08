import { css } from "@emotion/react";

export const mainContainer = css`
  position: relative;
  width: 950px;
  height: 190px;
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  outline: 1px solid #d4d4d4;
  padding: 22px 30px;
  margin-top: 20px;
  justify-content: flex-end;
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
  font-weight: 700;
  color: #3f4756;
  font-size: 20px;
  line-height: 1.4;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

export const selectedVoteButton = css`
  background-color: #7b9acc99;
  pointer-events: none;
`;

export const dropdownWrapper = css`
  position: absolute;
  right: 30px; // 수정
  top: 50px; // 추가: vector 아래로 떨어지게
  z-index: 10;
`;

export const vectorWrapper = css`
  position: absolute;
  display: inline-block;
  height: 30px;
  width: 30px;
`;
