import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";

function FavoritesPage() {
  const { state, dispatch } = useFavorites();

  const removeFavorite = (photoId: number) => {
    dispatch({ type: "REMOVE_FAVORITE", photoId });
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Favorites</h2>
      <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
        {state.photos.map((photo) => (
          <li key={photo.id} style={{ marginBottom: "20px" }}>
            <Link to={`/users/${photo.userId}/albums/${photo.albumId}/photos`}>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ display: "block", margin: "0 auto" }}
              />
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
