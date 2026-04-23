"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollection = dbConnection(collections.CARTS);

export const addToCart = async (product, inc = true) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false, message: "User not authenticated" };
  const email = user?.email;
  const query = { email, productId: product._id };
  const existingCartItem = await cartCollection.findOne(query);

  // If item already exists in cart, update quantity
  if (existingCartItem) {
    const updatedQuantity = {
      $inc: { quantity: inc ? 1 : -1 },
    };
    const result = await cartCollection.updateOne(query, updatedQuantity);
    return {
      success: result.modifiedCount > 0,
      message: "Cart updated successfully",
    };
  } else {
    // If item does not exist in cart, add new item
    const newCartItem = {
      email,
      userName: user.name,
      productId: product._id,
      quantity: 1,
      title: product.title,
      price: product.price - (product.price * product.discount) / 100,
      image: product.image,
    };
    const result = await cartCollection.insertOne(newCartItem);
    return {
      success: result.insertedId,
      message: "Product added to cart successfully",
    };
  }
};

export const getCartItems = cache(async () => {
  const user = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false, message: "User not authenticated" };
  const email = user?.email;
  const cartItems = await cartCollection.find({ email }).toArray();
  return JSON.parse(JSON.stringify(cartItems));
})
export const removeFromCart = async (productId) => {
  const user = await getServerSession(authOptions);

  if (!user) return { success: false, message: "User not authenticated" };
  const email = user?.email;
  const query = { email, _id: new ObjectId(productId) };

    const result = await cartCollection.deleteOne(query);
    if (result.deletedCount > 0) {
        revalidatePath("/cart");
    }

  return { success: true,result, message: "Product removed from cart successfully" };
};

export const clearCart = async (email) => {
    const result = await cartCollection.deleteMany({ email });
    return { success: result.deletedCount > 0, message: "Cart cleared successfully" };
};