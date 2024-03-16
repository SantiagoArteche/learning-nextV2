"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo with id ${id} not found`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const session = await getServerSession(authOptions);

  try {
    const todo = await prisma.todo.create({
      data: { description, userId: session?.user?.id },
    });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return { msg: "Error creating todo" };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    console.log(error);
  }
};
