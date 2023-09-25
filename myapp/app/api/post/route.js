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


export const POST = async (request) => {
    const body = await request.json();
    const newPost = new Post(body);
    try {
        await db.connect()
      await newPost.save();
      return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
      console.error(err);
      return new NextResponse("Database Error", { status: 500 });
    }
}