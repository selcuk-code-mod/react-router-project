import { createBrowserRouter } from "react-router-dom";
import { HomePage, RootLayout, UsersPage } from "./pages";
import { usersLoader } from "./pages/UsersPage";
import UsersDetailPage from "./pages/UsersDetailPage";
import { userLoader } from "./pages/UsersDetailPage";
import { UserAlbums, UserPosts, UserTodos } from "./pages/userinfo";
import { userPostsLoader } from "./pages/userinfo/UserPosts";
import { usersAlbumsLoader } from "./pages/userinfo/UserAlbums";
import { userTodosLoader } from "./pages/userinfo/UserTodos";
import "./routes.css";
const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",

        children: [
          { index: true, element: <UsersDetailPage />, loader: userLoader },
          { path: "posts", element: <UserPosts />, loader: userPostsLoader },
          {
            path: "albums",
            element: <UserAlbums />,
            loader: usersAlbumsLoader,
          },
          { path: "todos", element: <UserTodos />, loader: userTodosLoader },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
