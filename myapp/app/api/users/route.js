import { NextResponse } from "next/server";
import db from "../../../lib/mongodb.js"
import User from "@/models/User.js";


export const GET = async (request)=> {
    try {
      await db.connect()

        const users = await User.find({})

        return new NextResponse(JSON.stringify(users), { status: 200 });
      } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
      }
}