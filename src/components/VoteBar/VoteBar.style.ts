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
  width: 500px;
  height: 20px;
  background: white;
  border-radius: 32px;
  overflow: hidden;
`;

export const barWrapperEmpty = css`
  width: 500px;
  height: 20px;
  background: none;
  border: 1px solid #dfe3e8;
  border-radius: 32px;
`;

export const blueBar = (percent: number) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${percent}%;
  height: 100%;
  background: #385b88;
  border-radius: 32px 0 0 32px;
`;

export const redBar = (percent: number) => css`
  position: absolute;
  top: 0;
  right: 0;
  width: ${percent}%;
  height: 100%;
  background: #ff6767;
  border-radius: 0 32px 32px 0;
`;
