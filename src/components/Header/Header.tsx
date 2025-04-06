/** @jsxImportSource @emotion/react */
import React from "react";
import * as styles from "./Header.style"; 
import fe_search from "../../assets/fe_search.svg";

const Header: React.FC = () => {
  return (
    <div css={styles.header}>
      <div css={styles.textTitle}>BOOKING</div>
      <div css={styles.searchLogin}>
        <img css={styles.feSearch} src={fe_search} alt="검색 아이콘" />
        <div css={styles.loginBorder}>
          <div css={styles.loginText}>회원가입/로그인</div>
        </div>
      </div>
    </div>
  );
};

export default Header;