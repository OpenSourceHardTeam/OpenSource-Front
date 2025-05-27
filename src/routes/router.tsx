import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import routes from "@constants/routes";
import BookInfoPage from "pages/BookDetail/BookInfoPage";
import ChatList from "pages/ChatList/ChatList";
import ChatPage from "pages/Chat/ChatPage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignUpPage from "pages/SignUpPage/SignUpPage";
import BookListPage from "pages/BookListPage/BookListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      {
        path: routes.bookinfo,
        element: <BookInfoPage />,
      },
      {
        path: routes.chat,
        element: <ChatPage />,
      },
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.chatlist,
        element: <ChatList />,
      },
      {
        path: routes.signup,
        element: <SignUpPage />,
      },
      {
        path: routes.booklist,
        element: <BookListPage />,
      },
    ],
  },
]);

export default router;
