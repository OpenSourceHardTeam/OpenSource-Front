import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, ChatIcon, BookIcon } from "@assets/index";
import { container, iconStyle, mainContainer } from "./SideBar.style";
import routes from "@constants/routes";

const getNavLinkStyle = (isActive: boolean) => ({
  color: isActive ? "#385B88" : "#989BA2",
});

const menuItems = [
  { to: routes.home, icon: <HomeIcon css={iconStyle} /> },
  {
    to: routes.chatlist,
    icon: <ChatIcon css={iconStyle} />,
  },
  {
    to: routes.bookinfo,
    icon: <BookIcon css={iconStyle} />,
  },
];

const SideBar: React.FC = () => {
  const [top, setTop] = useState(0);

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

  return (
    <div css={mainContainer(top)}>
      <div css={container}>
        {menuItems.map(({ to, icon }, index) => (
          <NavLink
            key={index}
            to={to}
            style={({ isActive }) => getNavLinkStyle(isActive)}
          >
            {icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
