"use server";

import { collections, dbConnection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const data = await dbConnection(collections.PRODUCTS).find().toArray();

  return data.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
};

export const getProductById = async (_id) => {
    const product = await dbConnection(collections.PRODUCTS).findOne({ _id: new ObjectId(_id) });
    console.log('product',product);
    
    return JSON.parse(JSON.stringify(product));
};
