import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ChatIcon, BookIcon } from "@assets/index";
import { container, iconStyle, mainContainer } from "./SideBar.style";
import routes from "@constants/routes";

// const getNavLinkStyle = (isActive: boolean) => ({
//   color: isActive ? "#385B88" : "#989BA2",
// });

const menuItems = [
  { to: routes.main, icon: <HomeIcon css={iconStyle} /> },
  {
    to: routes.chatlist,
    icon: <ChatIcon css={iconStyle} />,
  },
  {
    to: routes.booklist,
    icon: <BookIcon css={iconStyle} />,
  },
];

const SideBar: React.FC = () => {
  const [top, setTop] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getAdjustedTop = () => {
      const scrollY = window.scrollY;
      return scrollY < 300
        ? window.innerHeight / 2 + scrollY - 150
        : scrollY + 70;
    };

    setTop(getAdjustedTop());

    const debounce = <T extends (...args: unknown[]) => void>(
      func: T,
      wait: number
    ) => {
      let timeout: number | null = null;
      return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
      };
    };

    const handleScroll = debounce(() => {
      setTop(getAdjustedTop());
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleNavigate = (to: string) => {
    if (to === routes.chatlist && !isLoggedIn) {
      alert("로그인 후에 채팅 페이지를 이용할 수 있어요.");
      navigate("/login");
      window.scrollTo(0, 0);
      return;
    }
    navigate(to);
  };

  return (
    <div css={mainContainer(top)}>
      <div css={container}>
        {menuItems.map(({ to, icon }, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(to)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: window.location.pathname === to ? "#385B88" : "#989BA2",
            }}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
