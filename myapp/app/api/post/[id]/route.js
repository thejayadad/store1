import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";
import db from "../../../../lib/mongodb.js"


export const GET = async (request, {params}) => {
    const { id } = params;
    await db.connect()
    try {

      const post = await db.collection("post").findById({ _id: new ObjectId(id) });


      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Database Error", { status: 500 });
    }
}