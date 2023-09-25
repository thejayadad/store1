import { NextResponse } from "next/server";
import db from "../../../../lib/mongodb.js"
import Post from "@/models/Post.js";



export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await db.connect();

    const post = await Post.findById(id);

    if (!post) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await db.connect();

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({msg: 'Successfully deleted post'}), {status: 200})
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
