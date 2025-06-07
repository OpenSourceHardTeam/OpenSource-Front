import { css } from "@emotion/react";

export const loginframe = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 0 auto;
  padding-top: 150px;
  align-items: center;
  gap: 30px;
`;
export const contentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const logintext = css`
  height: 52px;
  padding-bottom: 80px;
  color: #7b9acc;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
`;

export const loginid = css`
  position: relative;
  padding: 12px;

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
  padding: 12px;

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
