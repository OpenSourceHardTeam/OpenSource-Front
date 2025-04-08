import React from "react";
import { container, percentText, barWrapper, redBar } from "./VoteBar.style";

interface VoteBarProps {
  leftPercent: number;
  rightPercent: number;
}

const VoteBar: React.FC<VoteBarProps> = ({ leftPercent, rightPercent }) => {
  return (
    <div css={container}>
      <div css={percentText}>{leftPercent}%</div>
      <div css={barWrapper}>
        <div css={redBar(leftPercent)} />
      </div>
      <div css={percentText}>{rightPercent}%</div>
    </div>
  );
};

export default VoteBar;
