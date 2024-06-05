/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";

interface TodoProps {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userTodosLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/todos`
  );
  const todos = await response.json();
  return todos;
};

function UserTodos() {
  const todos = useLoaderData() as TodoProps[];
  return (
    <>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserTodos;
