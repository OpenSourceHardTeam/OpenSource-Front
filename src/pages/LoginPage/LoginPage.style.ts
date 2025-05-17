import { css } from "@emotion/react";

export const loginframe = css`
  display: flex;
  flex-direction: column;
  width: 1440px;
  height: 100%;
  align-items: center;
  gap: 30px;
  position: relative;
  top: 216px;
`;

export const logintext = css`
  position: relative;
  align-self: stretch;
  height: 52px;
  margin-top: -1px;
  color: #7b9acc;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

export const loginid = css`
  position: relative;
  width: 370px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid;
  border-color: #d9d9d9;
  &::placeholder {
    padding-left: 5px;
    color: #d9d9d9;
  }
`;

export const logincheck = css`
  display: flex;
  gap: 10px;
`;

export const loginpw = css`
  position: relative;
  width: 500px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid;
  border-color: #d9d9d9;
  &::placeholder {
    padding-left: 5px;
    color: #d9d9d9;
  }
`;

export const text = css`
  text-align: center;
  color: #d9d9d9;
`;
