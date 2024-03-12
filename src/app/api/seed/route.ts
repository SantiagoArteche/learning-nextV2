import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){

    await prisma.todo.deleteMany()

    const todo = await prisma.todo.createMany({
        data: [{description: 'Soul stone', complete: true}, {
            description: 'Power stone'
        },
        {description: 'Space stone'},
        {description: 'Time stone'},
        {description: 'Reality stone'}
    ]
    })
    
    return NextResponse.json({
        msg: 'Seed executed'
    })
}