"use client";

import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import * as todosApi from "@/todos/helpers/todos";
import { addTodo } from "@/todos/actions/actions";

export const NewTodo = () => {
  const router = useRouter();
  const pathName = usePathname();

  const newTodo = async (description: string) => {
    if (pathName === "/dashboard/server-todos") {
      return addTodo(description);
    } else {
      const newTodo = await todosApi.createTodo(description);

      router.refresh();

      return newTodo;
    }
  };

  const { handleChange, handleSubmit, resetForm, values } = useFormik({
    initialValues: {
      description: "",
    },
    validateOnChange: false,
    onSubmit: async ({ description }) => {
      if (description.trim().length === 0) return;

      newTodo(description);
      resetForm();
    },
  });

  return (
    <form className="flex w-full px-7 pb-5 " onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={handleChange}
        name="description"
        value={values.description}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>
    </form>
  );
};
