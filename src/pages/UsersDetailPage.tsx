import { Link, useLoaderData, useParams } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const userLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  return user;
};
function UsersDetailPage() {
  const user = useLoaderData() as User;
  const { userId } = useParams();
  return (
    <>
      <h1>{user.name}</h1>
      <p>Username:{user.name}</p>
      <p>Email:{user.email}</p>
      <nav>
        <ul>
          <li>
            <Link to={`/users/${userId}/posts`}>Posts</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/albums`}>Albums</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/todos`}>Todos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UsersDetailPage;
