import { css } from "@emotion/react";

export const MainContainer = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 80px 200px 100px 200px;
`;

export const WeeklyBestContainer = css`
  display: flex;
  flex-direction: column;
  font-size: 40px;
  font-weight: 700;
  color: #7b9acc;
  gap: 18px;
`;

export const Container = css`
  display: flex;
  flex-direction: row;
  gap: 110px;
  padding: 47px 25px 0px 25px;
`;

export const BookContainer = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #0e2624;
  font-size: 24px;
`;

export const PopularVoteContainer = css`
  display: flex;
  flex-direction: column;
  gap: 65px;
`;
