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
      const isUserExist = await dbConnection(collections.USERS).findOne({
        email: user.email,
      });
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
    async session({ session, user, token }) {
      if (token) {
        session.role = token?.role || "user";
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwts',token,user,account);
      
      if (user) {
        if (account?.provider === "google") {
          const dbUser = await dbConnection(collections.USERS).findOne({
            email: user.email,
          });
          token.role = dbUser?.role  ;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role ;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
