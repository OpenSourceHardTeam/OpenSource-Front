import React from "react";
import * as styles from "./Header.style";
import Button from "../Button/Button";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "@assets/index";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  // 로그인 상태 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    // 로그인 시 수동 이벤트 발생하거나 다른 곳에서 이벤트 발생 시 동기화됨
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleHomeClick = () => {
    navigate(routes.main);
  };

  const handleLoginClick = () => {
    navigate(routes.login);
  };

  return (
    <div css={styles.header}>
      <div css={styles.textTitle} onClick={handleHomeClick}>
        BOOKING
      </div>
      <div css={styles.searchLogin}>
        {isLoggedIn ? (
          <ProfileIcon />
        ) : (
          <div css={styles.loginBorder}>
            <div css={styles.loginText} onClick={handleLoginClick}>
              <Button text={"회원가입/로그인"} type={"log"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
