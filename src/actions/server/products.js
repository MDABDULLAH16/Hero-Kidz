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

  if(!ObjectId.isValid(_id)) {
    return null;
  }
    const product = await dbConnection(collections.PRODUCTS).findOne({ _id: new ObjectId(_id) });
     const singleProduct = JSON.parse(JSON.stringify(product));
    
    return {...singleProduct, _id: singleProduct._id.toString()};
};
