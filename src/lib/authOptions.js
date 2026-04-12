import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        
      },
      async authorize(credentials, req) {
       try {
         console.log("Credentials received:", credentials);
         const user = await loginUser(credentials);
         return user;
       } catch (error) {
        console.log(error);
        return null;
        
       }
      },
    }),
  ],
};
