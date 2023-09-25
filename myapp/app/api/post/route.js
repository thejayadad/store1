import { NextResponse } from "next/server";
import Post from "@/models/Post";
import clientPromise from "@/lib/mongodb";

export const GET = async (request, { params }) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection("post").find({})

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const POST = async (request) => {
    const body = await request.json();
    const newPost = new Post(body);
    try {
      const client = await clientPromise;
      const db = client.db();
      await newPost.save();
      return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
      console.error(err);
      return new NextResponse("Database Error", { status: 500 });
    }
}