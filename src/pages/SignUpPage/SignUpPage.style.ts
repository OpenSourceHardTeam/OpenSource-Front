import { css } from "@emotion/react";

export const signupframe = css`
  display: flex;
  flex-direction: column;
  width: 1440px;
  height: 100%;
  align-items: center;
  gap: 30px;
  position: relative;
  top: 97px;
`;

export const signuptext = css`
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

export const signupnickname = css`
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

export const signupContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const signupid = css`
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
  align-items: center;
  width: 500px;
  align-self: center;
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

export const signupcheckbox = css`
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin: 0;

  &:checked {
    background-color: #7b9acc;
    border-color: #d9d9d9;
  }

  &:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 12px;
    left: 2px;
    top: -2px;
  }
`;

export const backtologintext = css`
  text-align: center;
  color: #7b9acc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
