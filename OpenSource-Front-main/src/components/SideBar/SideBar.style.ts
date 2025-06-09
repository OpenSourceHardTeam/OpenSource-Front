import { css } from "@emotion/react";

export const mainContainer = (top: number) => css`
  display: flex;
  position: absolute;
  align-items: flex-start;
  top: ${top}px;
  left: 2rem;
  transform: translateY(15%);
  transition: top 0.5s ease-in-out;
`;

export const container = css`
  width: 90px;
  padding: 45px 22px;
  border: 0.1rem solid #e6e8ea;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  align-items: center;
  box-shadow: 0px 4px 12px 0px rgba(13, 10, 44, 0.06);
  border-radius: 12px;
  background-color: white;
`;

export const iconStyle = css`
  width: 28px;
  height: 28px;
`;
