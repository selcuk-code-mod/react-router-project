/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData, useParams } from "react-router-dom";
import { useFavorites } from "../userinfo/FavoritesContext";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userPhotosData = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photos: Photo[] = await response.json();
  return photos;
};

function UserPhotos() {
  const photos = useLoaderData() as Photo[];
  const { albumId } = useParams();
  const { state, dispatch } = useFavorites();

  const isFavorite = (photoId: number) =>
    state.photos.some((photo) => photo.id === photoId);

  const addFavorite = (photo: Photo) => {
    dispatch({ type: "ADD_FAVORITE", photo });
  };

  const removeFavorite = (photoId: number) => {
    dispatch({ type: "REMOVE_FAVORITE", photoId });
  };

  return (
    <>
      <h2>Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id} style={{ listStyle: "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <img
                  style={{ width: "200px" }}
                  src={photo.url}
                  alt={photo.title}
                />
              </div>
              <div>
                <p>{photo.title}</p>
              </div>
              <div>
                <button
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  onClick={() =>
                    isFavorite(photo.id)
                      ? removeFavorite(photo.id)
                      : addFavorite({
                          ...photo,
                          userId: parseInt(albumId || "0"),
                        })
                  }
                >
                  {isFavorite(photo.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPhotos;
