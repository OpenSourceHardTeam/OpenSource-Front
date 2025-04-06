/** @jsxImportSource @emotion/react */
import React from "react";
import { buttonWrapper, transparentButton } from "./Button.style";

// props 타입 정의
interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div css={buttonWrapper}>
      <button css={transparentButton} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
