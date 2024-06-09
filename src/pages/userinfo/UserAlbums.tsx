/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLoaderData, useParams } from "react-router-dom";

interface AlbumParams {
  userId: number;
  id: number;
  title: string;
}

interface UserParams {
  id: number;
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const usersAlbumsLoader = async ({ params }: any) => {
  const albumsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/albums`
  );
  const albums: AlbumParams[] = await albumsResponse.json();

  const usersPromises = albums.map(async (album: AlbumParams) => {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${album.userId}`
    );
    const user: UserParams = await userResponse.json();
    return { ...album, user };
  });

  const albumsWithUsers = await Promise.all(usersPromises);

  return albumsWithUsers;
};

function UserAlbums() {
  const albumsWithUsers = useLoaderData() as (AlbumParams & {
    user: UserParams;
  })[];
  const { userId } = useParams();

  return (
    <>
      <h2>Albums</h2>
      <ul>
        {albumsWithUsers.map((album) => (
          <li key={album.id}>
            <Link to={`/users/${userId}/albums/${album.id}/photos`}>
              {album.title}
            </Link>
            <br />
            <small>
              <Link to={`/users/${album.userId}`}>{album.user.name}</Link>
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserAlbums;
