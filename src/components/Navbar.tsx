import { Link } from "react-router-dom";
import { useFavorites } from "../pages/userinfo/FavoritesContext";

function Navbar() {
  const { state } = useFavorites();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites ({state.photos.length})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
