import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import db from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await db.connect();

    // Fetch the user by ID
    const user = await User.findById(id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Fetch all posts by the user using the user's email
    const posts = await Post.find({ username: user.email });

    // Create a user object with the user's data and posts
    const userData = {
      _id: user._id,
      username: user.username,
      // Add any other user fields you want to include
      posts: posts,
    };

    return new NextResponse(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
