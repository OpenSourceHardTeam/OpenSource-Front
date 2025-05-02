import { useState, useEffect } from 'react';

// 남은 시간을 계산하는 훅 (카운트다운)
export const useCountdownTimer = (initialMinutes: number, initialSeconds: number) => {
  // 총 남은 시간을 초 단위로 계산
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 + initialSeconds);
  
  useEffect(() => {
    // 남은 시간이 0이면 타이머 중지
    if (timeLeft <= 0) return;
    
    // 1초마다 시간 감소
    const timerID = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timerID);
  }, [timeLeft]);
  
  // 분과 초로 변환
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // 시간 문자열 반환
  return {
    minutes,
    seconds,
    formattedTime: `${minutes}분 ${seconds}초`,
    isFinished: timeLeft <= 0
  };
};

// 경과 시간을 계산하는 훅 (카운트업)
export const useElapsedTimer = (maxMinutes: number = 15) => {
  // 경과 시간을 초 단위로 저장
  const [elapsedTime, setElapsedTime] = useState(0);
  const maxTime = maxMinutes * 60; // 최대 시간 (초 단위)
  
  useEffect(() => {
    // 최대 시간에 도달하면 타이머 중지
    if (elapsedTime >= maxTime) return;
    
    // 1초마다 시간 증가
    const timerID = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timerID);
  }, [elapsedTime, maxTime]);
  
  // 분과 초로 변환
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  
  // 포맷팅된 시간 문자열 반환 (예: "10:15")
  return {
    minutes,
    seconds,
    formattedTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    isFinished: elapsedTime >= maxTime
  };
};