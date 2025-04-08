import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import routes from "@constants/routes";
import BookInfoPage from "pages/Home/BookInfoPage";
import ChatList from "pages/ChatList/ChatList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.bookinfo,
        element: <BookInfoPage />,
      },
      {
        path: routes.chatlist,
        element: <ChatList />,
      },
    ],
  },
]);

export default router;
