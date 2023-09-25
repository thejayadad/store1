import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"



export const GET = async (request)=> {
    try {
        const client = await clientPromise;
        const db = client.db();

        const users = await db.collection("users").find({}).toArray();

        return new NextResponse(JSON.stringify(users), { status: 200 });
      } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
      }
}