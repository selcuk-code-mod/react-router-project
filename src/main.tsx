import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { FavoritesProvider } from "./pages/userinfo/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FavoritesProvider>
    <RouterProvider router={router} />
  </FavoritesProvider>
);
