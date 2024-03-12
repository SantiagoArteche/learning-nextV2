import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  const todo = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await todo.json();

  return data;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const newTodo = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await newTodo.json();

  return data;
};

export const deleteCompletedTodo = async (): Promise<boolean> => {
  const deleteTodo = await fetch(`http://localhost:3000/api/todos`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });

  const data = await deleteTodo.json();

  return data;
};
