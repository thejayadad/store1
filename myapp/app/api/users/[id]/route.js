import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";



export const GET = async (request, {params}) => {
    const { id } = params;

    try {
      const client = await clientPromise;
      const db = client.db();

      const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      if (user.postIds && user.postIds.length > 0) {
        const posts = await db
          .collection("posts")
          .find({ _id: { $in: user.postIds.map((postId) => new ObjectId(postId)) } })
          .toArray();

        user.posts = posts;
      } else {
        user.posts = [];
      }

      return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Database Error", { status: 500 });
    }
}