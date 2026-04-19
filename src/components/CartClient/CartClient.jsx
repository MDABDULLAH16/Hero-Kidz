"use client";
import React, { useState } from "react";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const CartClient = ({ cartItems }) => {
  const [items, setItems] = useState(cartItems);

  const userName = items[0]?.userName || "Guest User";

  const handleIncrease = (id) => {
    const updated = items.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setItems(updated);
  };

  const handleDecrease = (id) => {
    const updated = items.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setItems(updated);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaShoppingCart className="text-2xl" />
          <h1 className="text-2xl font-bold">{userName}'s Cart</h1>
        </div>

        {/* Items */}
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center gap-4 border-b py-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 rounded-lg object-cover"
            />

            <div className="flex-1 text-center md:text-left">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="opacity-70">৳{item.price}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handleDecrease(item._id)}
              >
                <FaMinus />
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                className="btn btn-sm btn-outline"
                onClick={() => handleIncrease(item._id)}
              >
                <FaPlus />
              </button>
            </div>

            {/* Subtotal */}
            <div className="font-semibold">৳{item.price * item.quantity}</div>
          </div>
        ))}

        {/* Total */}
        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Total: ৳{totalPrice}</h2>
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
