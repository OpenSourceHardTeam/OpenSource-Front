import React from "react";
import {
  container,
  percentText,
  barWrapper,
  barWrapperEmpty,
  blueBar,
  redBar,
} from "./VoteBar.style";

interface VoteBarProps {
  leftPercent: number;
  rightPercent: number;
}

const VoteBar: React.FC<VoteBarProps> = ({ leftPercent, rightPercent }) => {
  const isEmpty = leftPercent === 0 && rightPercent === 0;

  return (
    <div css={container}>
      <div css={percentText}>{leftPercent}%</div>
      <div css={isEmpty ? barWrapperEmpty : barWrapper}>
        {!isEmpty && (
          <>
            <div css={blueBar(leftPercent)} />
            <div css={redBar(rightPercent)} />
          </>
        )}
      </div>
      <div css={percentText}>{rightPercent}%</div>
    </div>
  );
};

export default VoteBar;
