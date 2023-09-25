import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import db from "@/lib/mongodb";
import User from "@/models/User";


export const GET = async (request, {params}) => {
    const { id } = params;

    try {
      await db.connect()

      const user = await User.findById(id);

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }


      return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Database Error", { status: 500 });
    }
}