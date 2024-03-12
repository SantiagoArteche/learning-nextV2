export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/app/lib/prisma";
import { DeleteTodo } from "@/todos/components/Todos/DeleteTodo";
import { NewTodo } from "@/todos/components/Todos/NewTodo";
import { TodosGrid } from "@/todos/components/Todos/TodosGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rest TODOS",
  description: "Todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });


  return (
    <div>
      <div className="flex justify-between">
        <NewTodo />
        <DeleteTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
