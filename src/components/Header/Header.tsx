import React from "react";
import * as styles from "./Header.style";
import Button from "../Button/Button";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "@assets/index";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleHomeClick = () => {
    navigate(routes.main);
  };

  const handleLoginClick = () => {
    navigate(routes.login);
  };

  const handleProfileClick = () => {};

  return (
    <div css={styles.header}>
      <div css={styles.textTitle} onClick={handleHomeClick}>
        BOOKING
      </div>
      <div css={styles.searchLogin}>        
        <div css={styles.loginBorder}>
          <div css={styles.loginText}>
            <Button text={"회원가입/로그인"} type={"log"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
