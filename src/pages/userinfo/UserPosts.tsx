/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLoaderData, useParams } from "react-router-dom";

interface PostParams {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UserParams {
  id: number;
  name: string;
}

export const userPostsLoader = async ({ params }: any) => {
  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/posts`
  );
  const posts: PostParams[] = await postsResponse.json();

  const usersPromises = posts.map(async (post: PostParams) => {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );
    const user: UserParams = await userResponse.json();
    return { ...post, user };
  });

  const postsWithUsers = await Promise.all(usersPromises);

  return postsWithUsers;
};

function UserPosts() {
  const postsWithUsers = useLoaderData() as (PostParams & {
    user: UserParams;
  })[];
  const { userId } = useParams();

  return (
    <>
      <h2>Posts</h2>

      <ul>
        {postsWithUsers.map((post) => (
          <li key={post.id}>
            <Link to={`/users/${userId}/posts/${post.id}`}>{post.title}</Link>
            <br />
            <small>
              <Link to={`/users/${post.userId}`}>{post.user.name}</Link>
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPosts;
