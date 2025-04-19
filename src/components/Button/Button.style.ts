import { css } from "@emotion/react";

// 기본 버튼 스타일
export const baseButton = css`
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 600;
  display: flex;
  padding: 11px 32px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

// 1. 메인화면, 책 페이지의 "채팅방 참여하기" 버튼
export const bigJoinButton = css`
  ${baseButton}
  width: 345px;
  height: 56px;
  border-radius: 10px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 20px;
`;

// 2. "메인페이지 투표하러 가기" 버튼
export const voteButton = css`
  ${baseButton}
  width: 118px;
  height: 36px;
  border-radius: 32px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 16px;
`;

// 3. 채팅방 목록의 "채팅방 참여하기" 버튼
export const smallJoinButton = css`
  ${baseButton}
  width: 197px;
  height: 56px;
  border-radius: 10px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 20px;
`;

// 4. 책 페이지의 "찬성, 반대" 버튼
export const voteOptionButton = css`
  ${baseButton}
  width: 250px;
  height: 38px;
  border-radius: 20px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 14px;
`;

// 5. "회원가입/로그인" 버튼
export const logButton = css`
  ${baseButton}
  width: 152px;
  height: 40px;
  border-radius: 32px;
  border: 2px solid #fcf6f5;
  color: #f8f6f2;
  font-size: 16px;
`;

// 6. "채팅방 나가기" 버튼
export const leaveButton = css`
  ${baseButton}
  width: 288px;
  height: 56px;
  border-radius: 10px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 20px;
`;

// 7. 중복 확인 버튼
export const duplicateButton = css`
  ${baseButton}
  width: 120px;
  height: 60px;
  border-radius: 10px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 14px;
`;

export const loginButton = css`
  ${baseButton}
  width: 500px;
  height: 60px;
  border-radius: 10px;
  background-color: #7b9acc;
  color: #f8f6f2;
  font-size: 18px;
`;

export const signupButton = css`
  ${baseButton}
  width: 500px;
  height: 60px;
  border-radius: 10px;
  background-color: #ffffff;
  color: #7b9acc;
  font-size: 18px;
  border: 1px solid;
  border-color: #7b9acc;
  border-radius: 10px;
`;
