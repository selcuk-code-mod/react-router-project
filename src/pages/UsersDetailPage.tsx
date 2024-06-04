import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

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
    </>
  );
}

export default UsersDetailPage;
