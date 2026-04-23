'use server';
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";
import { collections, dbConnection } from "@/lib/dbConnect";

const orderCollection = dbConnection(collections.ORDERS);
export const createOrder = async (orderData) => {
    const user = await getServerSession(authOptions);
    if (!user) return { success: false, message: "User not authenticated" };
    const cart = await getCartItems();
    if (cart.length===0) {
        return { success: false, message: "Cart is empty" };
    }
    const email = user?.email;
    // Here you would typically save the order to your database
    console.log("Order created for user:", email);
    const newOrder = {
        createdAt: new Date().toISOString(),
        email,
        items: cart,
        info: {...orderData},
      
    } 
    // Clear the cart after creating the order

    await clearCart(email);
    const result = await orderCollection.insertOne(newOrder);
    return { success: true, message: "Order created successfully", result};

};