import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
import { Global } from "@emotion/react";
import { globalStyles } from "styles/global";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <>
      <Global styles={globalStyles} />
      <Header />
      {!isHome && <div style={{ height: "65px" }} />} <Outlet />
      <Footer />
    </>
  );
}

export default App;
