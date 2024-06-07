/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLoaderData, useParams } from "react-router-dom";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const CommentDataLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${params.postId}`
  );
  const comment = await response.json();
  return comment;
};
function UserComments() {
  const comments = useLoaderData() as Comment[];
  const { postId } = useParams();
  return (
    <>
      <h1>Comments for Post {postId}</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            <strong>{comment.name}</strong>
          </p>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </>
  );
}

export default UserComments;
