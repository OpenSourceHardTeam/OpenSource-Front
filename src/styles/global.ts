import { css } from "@emotion/react";

export const globalStyles = css`
  html {
    font-family: "Pretendard";
  }

  * {
    margin: 0;
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

  main {
    min-height: calc(100vh - 65px);
    width: 1040px;
    margin: 80px 200px 100px 200px;
  }
`;
