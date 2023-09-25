import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
              await connect();
sza
              try {
                const user = await User.findOne({
                  email: credentials.email,
                });

                if (user) {
                  const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                  );

                  if (isPasswordCorrect) {
                    return user;
                  } else {
                    throw new Error("Wrong Credentials!");
                  }
                } else {
                  throw new Error("User not found!");
                }
              } catch (err) {
                throw new Error(err);
              }
            },
          }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ]
})

export { handler as GET, handler as POST };