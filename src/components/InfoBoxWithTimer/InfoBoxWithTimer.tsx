import React from 'react';
import * as styles from '../../pages/Chat/ChatPage.style.ts';
import { useCountdownTimer, useElapsedTimer } from './useTimer.ts';

interface InfoBoxWithTimersProps {
  title: string;
  discussionTitle: string;
  initialMinutes: number;
  initialSeconds: number;
  lineImage?: string;
}

const InfoBoxWithTimers: React.FC<InfoBoxWithTimersProps> = ({
  title,
  discussionTitle,
  initialMinutes,
  initialSeconds,
  lineImage
}) => {
  // 남은 시간 타이머 (카운트다운)
  const remainingTimer = useCountdownTimer(initialMinutes, initialSeconds);
  
  // 시작부터 경과 시간 타이머 (카운트업)
  const elapsedTimer = useElapsedTimer(initialMinutes);
  
  return (
    <div css={styles.InfoBox}>
      <div css={styles.InfoBoxHeader}>
        <h3 css={styles.HeaderText}>{title}</h3>
        <div css={styles.RemainingTime}>
          남은시간: {remainingTimer.formattedTime}
        </div>
      </div>
      
      {lineImage && <img css={styles.lineStyle} src={lineImage} alt="구분선" />}
      
      <h4 css={styles.InfoTitle}>{discussionTitle}</h4>
      
      <div css={styles.InfoDetail}>
        <span>시작: {elapsedTimer.formattedTime}</span>
        {remainingTimer.isFinished && (
          <span css={styles.FinishedBadge}>종료됨</span>
        )}
      </div>
    </div>
  );
};

export default InfoBoxWithTimers;