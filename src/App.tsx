import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
import { Global } from "@emotion/react";
import { globalStyles } from "styles/global";

function App() {
  // return (
  //   <div className="app-wrapper">
  //     <Header />
  //     <div className="app-content">
  //       <Outlet />
  //     </div>
  //     <Footer />
  //   </div>
  // );
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
