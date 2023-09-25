import { NextResponse } from "next/server";
import Post from "@/models/Post";
import db from "@/lib/mongodb";

export const GET = async (request)=> {
    try {
      await db.connect()

        const posts = await Post.find({})

        return new NextResponse(JSON.stringify(posts), { status: 200 });
      } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
      }
}


export const POST = async (req) => {
    await db.connect()
    try {
        const body = await req.json()
        const newPost = await Post.create(body)
        return new Response(JSON.stringify(newPost), { status: 201 })

    } catch (err) {
      console.error(err);
      return new NextResponse("Database Error", { status: 500 });
    }
}