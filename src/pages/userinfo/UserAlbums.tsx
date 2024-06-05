/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
interface AlbumProps {
  userId: number;
  id: number;
  title: string;
}
// eslint-disable-next-line react-refresh/only-export-components
export const usersAlbumsLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/albums`
  );
  const albums = await response.json();
  return albums;
};

function UserAlbums() {
  const albums = useLoaderData() as AlbumProps[];
  return (
    <>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </>
  );
}

export default UserAlbums;
