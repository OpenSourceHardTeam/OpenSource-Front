/** @jsxImportSource @emotion/react */
import React from "react";
import {
  baseButton,
  bigJoinButton,
  voteButton,
  smallJoinButton,
  voteOptionButton,
  logButton,
  leaveButton
} from "./Button.style";

// 버튼 타입 정의
export type ButtonType = 
  | 'bigChatRoomJoin'     // 메인화면/책 페이지의 채팅방 참여하기
  | 'vote'         // 투표하러 가기
  | 'smallChatRoomJoin'     // 채팅방 목록의 채팅방 참여하기
  | 'voteOption'   // 찬성, 반대 버튼
  | 'log'         // 회원가입/로그인 버튼
  | 'leave';       // 채팅방 나가기 버튼

// props 타입 정의
interface ButtonProps {
  text: string;
  onClick?: () => void;
  type: ButtonType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type, className }) => {
  // 버튼 타입에 따른 스타일 결정
  const getButtonStyle = () => {
    switch (type) {
      case 'bigChatRoomJoin':
        return bigJoinButton;
      case 'vote':
        return voteButton;
      case 'smallChatRoomJoin':
        return smallJoinButton;
      case 'voteOption':
        return voteOptionButton;
      case 'log':
        return logButton;
      case 'leave':
        return leaveButton;
      default:
        return baseButton;
    }
  };

  return (
    <button 
      css={getButtonStyle()} 
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;

// 채팅방 참여하기 버튼 -> width=345 height=56 border-radius: 10px in 메인화면이랑 책 페이지랑 same
// 투표하러 가기 -> 87 19 border-radius: 32px
// 채팅방 참여하기 --> 197 56 border-radius: 10px in 채팅방 목록
// 찬성, 반대 버튼 -> 250 38 border-radius: 20px in 책 페이지
// 회원가입/로그인 버튼 -> 152 40 border-radius: 32px, border 2px solid #FCF6F5
// 채팅방 나가기 버튼 -> 288 56 border-radius: 10px
// 수정사항 반영 
