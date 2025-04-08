/** VoteBar.style.ts */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const percentText = css`
  font-size: 20px;
  font-weight: 300;
  color: black;
`;

export const barWrapper = css`
  position: relative;
  width: 540px;
  height: 20px;
  background: #385b88;
  border-radius: 32px;
  overflow: hidden;
`;

export const redBar = (percent: number) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${percent}%;
  background: #ff6767;
  border-radius: 32px 0 0 32px;
`;
