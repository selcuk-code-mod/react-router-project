import { createBrowserRouter } from "react-router-dom";
import { HomePage, RootLayout, UsersPage } from "./pages";
import { usersLoader } from "./pages/UsersPage";
import UsersDetailPage from "./pages/UsersDetailPage";
import { userLoader } from "./pages/UsersDetailPage";

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
        element: <UsersDetailPage />,
        loader: userLoader,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
