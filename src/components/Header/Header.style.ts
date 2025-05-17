/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const header = css`
  display: flex;
  width: 100%;
  padding: 11px 13px;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #7b9acc;
  height: 65px;
  cursor: pointer;
`;

export const textTitle = css`
  position: relative;
  width: 200px;
  font-family: "Stencil-Regular", Helvetica, sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #fcf6f5;
  text-align: center;
  letter-spacing: 0;
  line-height: 50px;
`;

export const searchLogin = css`
  position: relative;
  width: 225px;
  height: 43px;
`;

export const loginBorder = css`
  display: flex;
  width: 156px;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 23px;
  position: absolute;
  left: 70px;
`;

export const loginText = css`
  position: relative;
  width: fit-content;
  font-family: "Pretendard-semiBold", Helvetica, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #f8f6f2;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;
