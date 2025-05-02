import React from "react";
import * as styles from "./Header.style";
import Button from "../Button/Button";
import { SearchIcon } from "@assets/index";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(routes.home);
  };

  return (
    <div css={styles.header}>
      <div css={styles.textTitle} onClick={handleHomeClick}>
        BOOKING
      </div>
      <div css={styles.searchLogin}>
        <SearchIcon css={styles.feSearch} />
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
