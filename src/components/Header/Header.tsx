import React, { useRef } from "react";
import * as styles from "./Header.style";
import Button from "../Button/Button";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "@assets/index";
import { useEffect, useState } from "react";
import Dropdown from "@components/DropDown/DropDown";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleHomeClick = () => {
    navigate(routes.main);
  };
  const handleMenuClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLoginClick = () => {
    navigate(routes.login);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div css={styles.header} ref={ref}>
      <div css={styles.textTitle} onClick={handleHomeClick}>
        BOOKING
      </div>
      {isLoggedIn ? (
        <div css={styles.iconContainer}>
          <ProfileIcon css={styles.iconStyle} onClick={handleMenuClick} />
        </div>
      ) : (
        <div css={styles.searchLogin}>
          <div css={styles.loginBorder}>
            <div css={styles.loginText} onClick={handleLoginClick}>
              <Button text={"회원가입/로그인"} type={"log"} />
            </div>
          </div>
        </div>
      )}
      {isDropdownOpen && (
        <Dropdown
          onClose={() => setIsDropdownOpen(false)}
          onLogout={handleLogout}
        />
      )}{" "}
    </div>
  );
};

export default Header;
