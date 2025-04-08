import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";
import { Global } from "@emotion/react";
import { globalStyles } from "styles/global";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
