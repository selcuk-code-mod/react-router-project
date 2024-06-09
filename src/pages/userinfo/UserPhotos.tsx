/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLoaderData, useParams } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const userPhotosData = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photos = await response.json();
  return photos;
};

function UserPhotos() {
  const photos = useLoaderData() as Photo[];
  const { albumId } = useParams();
  const { state, dispatch } = useFavorites();

  const isFavorite = (photoId: number) => {
    return state.photos.some((photo) => photo.id === photoId);
  };

  const toggleFavorite = (photo: Photo) => {
    if (isFavorite(photo.id)) {
      dispatch({ type: "REMOVE_FAVORITE", photoId: photo.id });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        photo: { ...photo, userId: parseInt(albumId) },
      });
    }
  };

  return (
    <>
      <h1>Photos</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {photos.map((photo) => (
          <li
            key={photo.id}
            style={{ marginBottom: "20px", textAlign: "center" }}
          >
            <img
              src={photo.url}
              alt={photo.title}
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
            <p>{photo.title}</p>
            <button
              onClick={() => toggleFavorite(photo)}
              style={{
                fontSize: "50px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isFavorite(photo.id) ? "red" : "grey",
              }}
            >
              ♥
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPhotos;
