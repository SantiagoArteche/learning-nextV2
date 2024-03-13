import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: bcrypt.hashSync("asdasd"),
      rols: ["admin", "client", " super-user"],
      todos: {
        create: [
          { description: "Soul stone", complete: true },
          {
            description: "Power stone",
          },
          { description: "Space stone" },
          { description: "Time stone" },
          { description: "Reality stone" },
        ],
      },
    },
  });

  return NextResponse.json({
    msg: "Seed executed",
  });
}
