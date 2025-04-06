/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const buttonWrapper = css`
  /* 필요하다면 래퍼 div 스타일도 추가 가능 */
`;

export const transparentButton = css`
  background-color: transparent;
  border: none;
  color: #f8f6f2;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
  }
`;
