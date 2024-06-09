import { Link } from "react-router-dom";
import { useFavorites } from "../userinfo/FavoritesContext";

function FavoritesPage() {
  const { state, dispatch } = useFavorites();

  const removeFavorite = (photoId: number) => {
    dispatch({ type: "REMOVE_FAVORITE", photoId });
  };

  return (
    <>
      <h2>Favorites</h2>
      <ul>
        {state.photos.map((photo) => (
          <li key={photo.id}>
            <Link to={`/users/${photo.userId}/albums/${photo.albumId}/photos`}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </Link>
            <p>{photo.title}</p>
            <button onClick={() => removeFavorite(photo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoritesPage;
