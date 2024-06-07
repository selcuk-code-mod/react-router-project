import { createBrowserRouter } from "react-router-dom";
import { HomePage, RootLayout, UsersPage } from "./pages";
import { usersLoader } from "./pages/UsersPage";
import UsersDetailPage from "./pages/UserDetailPage";
import { userLoader } from "./pages/UserDetailPage";
import {
  UserAlbums,
  UserComments,
  UserPosts,
  UserTodos,
  UsersPDetailPage,
} from "./pages/userinfo";
import { userPostsLoader } from "./pages/userinfo/UserPosts";
import { usersAlbumsLoader } from "./pages/userinfo/UserAlbums";
import { userTodosLoader } from "./pages/userinfo/UserTodos";
import { userPostChangeLoader } from "./pages/userinfo/UsersPDetailPage";
import "./routes.css";
import { CommentDataLoader } from "./pages/userinfo/UserComments";
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
            path: "posts/:postId",
            children: [
              {
                index: true,
                element: <UsersPDetailPage />,
                loader: userPostChangeLoader,
              },
              {
                path: "comments",
                element: <UserComments />,
                loader: CommentDataLoader,
              },
            ],
          },
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
