/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData, useParams } from "react-router-dom";

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
  const photos = await response.json();
  return photos;
};

function UserPhotos() {
  const photos = useLoaderData() as Photo[];
  const { albumId } = useParams();

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
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPhotos;
