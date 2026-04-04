'use server';
import { collections, dbConnection } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {  
 
    const {name,email,password} = payload;
    //checking payload
 if(!name || !email || !password){
     return null;
 }
    //checking if user already exists
    const isUserExist = await dbConnection(collections.USERS).findOne({ email });
    if(isUserExist){
        return null;
    }
    //if not, create new user 
    const user = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      role: "user",
    };
    const result = await dbConnection(collections.USERS).insertOne(user);
    //  return user data
    if (result.insertedId) {
        return {
            ...result,
            insertedId: result.insertedId.toString(),
        };
    }
 }
  
 