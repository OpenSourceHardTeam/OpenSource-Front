import { css } from "@emotion/react";

export const Container = css`
  height: 224px;
  border-radius: 20px;
  outline: 2px #d4d4d4 solid;
  display: flex;
  flex-direction: row;
  padding: 27px 36px;
  gap: 60px;
`;

export const BookImage = css`
  width: 117px;
  height: 170px;
`;

export const ContentContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 783px;
  height: 158px;
`;

export const InfoContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 19px;
`;

export const BookInfo = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const ButtonWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const textStyle = (
  variant: "title" | "author" | "topic" | "activity"
) => {
  const styles = {
    title: {
      color: "#0E2624",
      fontSize: "30px",
      fontWeight: 600,
      height: "35px",  
    },
    author: {
      color: "#3F4756",
      fontSize: "24px",
      fontWeight: 700,
      height: "28px",
    },
    topic: {
      color: "#3F4756",
      fontSize: "24px",
      fontWeight: 500,
      height: "28px",
    },
    activity: {
      color: "#FF6767",
      fontSize: "20px",
      fontWeight: 600,
      height: "20px",
    },
  };

  const { color, fontSize, fontWeight, height } = styles[variant];

  return css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${color};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    font-family: "Pretendard";
    line-height: 29.95px;
    height: ${height};
    word-wrap: break-word;
  `;
};
