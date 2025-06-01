import { css } from "@emotion/react";

export const signupframe = css`
  display: flex;
  flex-direction: column;
  width: 1040px;
  margin: 0 auto;
  height: 100%;
  align-items: center;
  gap: 30px;
  padding-top: 150px;
`;

export const signuptext = css`
  height: 52px;
  padding-bottom: 80px;
  color: #7b9acc;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

export const signupnickname = css`
  width: 370px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  &::placeholder {
    padding-left: 5px;
    color: #d9d9d9;
  }
`;

export const signupContainer = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const signupid = css`
  width: 370px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  &::placeholder {
    padding-left: 5px;
    color: #d9d9d9;
  }
`;

export const signupcheck = css`
  display: flex;
  gap: 10px;
`;

export const signuppw = css`
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

export const checkboxContainer = css`
  display: flex;
  width: 500px;
  margin-left: 5px;
`;

export const checkboxLabel = css`
  font-size: 14px;
  white-space: nowrap;
  color: #d9d9d9;
  margin-left: 10px;
  cursor: pointer;
`;

export const instruction = css`
  font-size: 14px;
  color: #6d7882;
`;

export const passwordBox = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const backtologintext = css`
  text-align: center;
  color: #7b9acc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
