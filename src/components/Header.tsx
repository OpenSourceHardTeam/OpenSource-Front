import React from "react";
import "./Header.css";
import fe_search from "../assets/fe_search.svg";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="text-title">BOOKING</div> 
      <div className="search-login">
        <img className="fe-search" src={fe_search} alt="검색 아이콘" />
        <div className="login-border">
          <div className="div">
            회원가입/로그인
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;