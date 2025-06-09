import { css } from "@emotion/react";
// import "pretendard/dist/web/static/pretendard.css";

export const globalStyles = css`
  html {
    font-family: "Pretendard", sans-serif;
  }

  * {
    padding: 0;
    box-sizing: border-box;
  }

  button {
    border: none;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
  }
`;
