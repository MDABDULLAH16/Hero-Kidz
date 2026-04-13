import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnection } from "./dbConnect";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          //  console.log("Credentials received:", credentials);
          const user = await loginUser(credentials);
          return user;
        } catch (error) {
          // console.log(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, email, profile, credentials });
      const isUserExist = await dbConnection(collections.USERS).findOne({ email: user.email, provider: account.provider });
      if (!isUserExist) {
        const newUser = {
          provider: account.provider,
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        await dbConnection(collections.USERS).insertOne(newUser);
      }
      return true;
    },
  }
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
};
