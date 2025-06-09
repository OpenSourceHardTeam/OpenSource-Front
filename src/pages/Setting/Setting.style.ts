import { css } from "@emotion/react";

export const mainContainer = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 80px 200px 100px 200px;
  align-items: center;
`;

export const container = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: 40px;
  font-weight: 700;
  color: #7b9acc;
  gap: 50px;
`;

export const profileContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 100px;
  padding-bottom: 28px;
  padding-left: 40px;
`;

export const imageStyle = css`
  width: 180px;
  height: 180px;
`;

export const profileContent = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 5px;
`;

export const textStyle = css`
  color: #919191;
  font-size: 18px;
  font-weight: 500;
`;

export const titleStyle = css`
  color: #3c3636;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 794px;
  padding-bottom: 30px;
  padding-top: 20px;
`;
export const signupnickname = css`
  width: 370px;
  height: 60px;
  padding: 12px;
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
