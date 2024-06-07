/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useLoaderData, useParams } from "react-router-dom";

interface User {
  userId: number;
  title: string;
  body: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const userPostChangeLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await response.json();
  return post;
};
function UsersPDetailPage() {
  const post = useLoaderData() as User;
  const { postId } = useParams();

  return (
    <>
      <h2>{post.userId}</h2>
      <p>{post.title}</p>
      <p>{post.body}</p>
      <nav>
        <ul>
          <li>
            <Link to={`/users/${post.userId}/posts/${postId}/comments`}>
              Comments
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UsersPDetailPage;
