import { Outlet } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
