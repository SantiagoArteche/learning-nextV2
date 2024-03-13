"use client";

import React from "react";
import * as todosApi from "@/todos/helpers/todos";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import { deleteCompleted as deleteComplete } from "@/todos/actions/actions";

export const DeleteTodo = () => {
  const router = useRouter();
  const pathName = usePathname();

  const deleteCompleted = async (): Promise<void | boolean> => {
    if (pathName === "/dashboard/server-todos") {
      return deleteComplete();
    } else {
      const onDelete = await todosApi.deleteCompletedTodo();

      router.refresh();

      return onDelete;
    }
  };
  return (
    <button
      onClick={() => deleteCompleted()}
      type="button"
      className="flex items-center justify-center rounded ml-2 bg-red-500 p-2 mb-2 w-72 text-white hover:bg-red-700 transition-all"
    >
      <IoTrashOutline size={30} />
      Delete Completed Todos
    </button>
  );
};
