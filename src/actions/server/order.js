"use server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";
import { collections, dbConnection } from "@/lib/dbConnect";
 
import { invoiceTemplate } from "@/lib/invoiceTemplate";
import { sendEmail } from "@/lib/sendEmail";

const orderCollection = dbConnection(collections.ORDERS);

export const createOrder = async (orderData) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false, message: "User not authenticated" };

  const cart = await getCartItems();
  if (cart.length === 0) {
    return { success: false, message: "Cart is empty" };
  }

  // const products = cart.map((item) => ({
  //   productId: item.productId,
  //   title: item.title,
  //   price: item.price,
  //   quantity: item.quantity,
  // }))

  const email = user?.user?.email;
  const customerName = user?.user?.name || "Valued Customer";

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharge = orderData.deliveryCharge || 60;
  const discount = orderData.discount || 0;
  const totalAmount = subtotal + deliveryCharge - discount;

  const orderId = `ORD-${Date.now()}`;

  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    email,
    items: cart,
    subtotal,
    deliveryCharge,
    discount,
    totalAmount,
    info: { ...orderData },
  };

  // Clear the cart after creating the order
  await clearCart(email);
  const result = await orderCollection.insertOne(newOrder);

 
 // inside createOrder, replace the transporter.sendMail calls with:

 try {
   // ✅ Customer invoice email
   await sendEmail(
     email,
     `✅ Order Confirmed - #${orderId}`,
     invoiceTemplate({
       orderId,
       customerName,
       customerEmail: email,
       address: orderData.address || "Bangladesh",
       items: cart,
       subtotal,
       deliveryCharge,
       discount,
       totalAmount,
     }),
   );

   // ✅ Admin notification
   await sendEmail(
     process.env.ADMIN_EMAIL,
     `🛒 New Order Received - #${orderId}`,
     `<div style="font-family:Arial,sans-serif;padding:20px">
            <h2 style="color:#16a34a">New Order Received</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer:</strong> ${customerName} (${email})</p>
            <p><strong>Total:</strong> ৳${totalAmount.toLocaleString()}</p>
        </div>`,
   );
 } catch (emailError) {
   console.error("Email sending failed:", emailError.message);
 }

  return {
    success: true,
    message: "Order created successfully",
    orderId,
    result,
  };
};
