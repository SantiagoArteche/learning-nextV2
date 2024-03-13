export const dynamic = "force-dynamic";
export const revalidate = 0;

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { DeleteTodo } from "@/todos/components/Todos/DeleteTodo";
import { NewTodo } from "@/todos/components/Todos/NewTodo";
import { TodosGrid } from "@/todos/components/Todos/TodosGrid";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Rest TODOS",
  description: "Todos",
};

export default async function RestTodosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { description: "asc" },
  });

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
