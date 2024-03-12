"use client";
import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import * as todosApi from "@/todos/helpers/todos";
import { useRouter, usePathname } from "next/navigation";
import { toggleTodo as toggle } from "../../actions/actions";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  const pathName = usePathname();

  const toggleTodo = async (id: string, complete: boolean) => {
    if (pathName === "/dashboard/server-todos") {
      return toggle(id, complete);
    } else {
      const updatedTodo = await todosApi.updateTodo(id, complete);

      router.refresh();
      return updatedTodo;
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
