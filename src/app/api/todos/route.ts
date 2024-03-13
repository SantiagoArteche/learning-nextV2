import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);

  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  if (isNaN(+take) || isNaN(+skip)) {
    return NextResponse.json(
      { msg: "Take and Skip should be a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });

  return NextResponse.json(todos);
}

const postSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  complete: Yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json("Unauthorized");
  }

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });

    return NextResponse.json({
      msg: "Todos deleted",
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
