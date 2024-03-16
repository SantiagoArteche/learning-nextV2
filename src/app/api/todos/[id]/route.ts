import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type Segments = {
  params: {
    id: string;
  };
};

const getTodo = async (id: string): Promise<Todo | null> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return null;

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (todo?.userId !== user.id) return null;

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { msg: `Todo with id ${params.id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = Yup.object({
  complete: Yup.boolean().optional().default(false),
  description: Yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { msg: `Todo with id ${params.id} not found` },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updateTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description },
    });

    return NextResponse.json({
      msg: "Todo updated",
      updateTodo,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
