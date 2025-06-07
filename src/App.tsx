// ===== App.tsx 수정 - ChatPage에서만 Footer 숨기기 =====

import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./App.css";
import { Global } from "@emotion/react";
import { globalStyles } from "styles/global";
import SideBar from "@components/SideBar/SideBar";
import routes from "@constants/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
  },
});

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isChatPage = location.pathname === routes.chat; // ✅ ChatPage 확인
  
  const excludedPaths = [routes.chat];
  
  const isSidebarVisible = !excludedPaths.includes(
    location.pathname as (typeof excludedPaths)[number]
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <Header />
        {isSidebarVisible && <SideBar />}
        {!isHome && <div style={{ height: "65px" }} />}
        <Outlet />
        {!isChatPage && <Footer />}
      </QueryClientProvider>
    </>
  );
}

export default App;