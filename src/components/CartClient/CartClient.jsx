"use client";
import { removeFromCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTrash,
  FaTruck,
} from "react-icons/fa";
import Swal from "sweetalert2";

const SHIPPING_CHARGE = 60;

const CartClient = ({ cartItems }) => {
  const session =useSession()
  const [items, setItems] = useState(cartItems);
  const userName = session?.data?.user?.name || "Guest User";

  const handleRemove = async (id) => {
    const result = await removeFromCart(id);
    if (result.success) {
      setItems((prev) => prev.filter((item) => item._id !== id));
      Swal.fire(
        "Removed!",
        "Product removed from cart successfully.",
        "success",
      );
    } else {
      Swal.fire("Error!", "Failed to remove product from cart.", "error");
    }
  };

  const handleIncrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const grandTotal = subtotal + SHIPPING_CHARGE;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaShoppingCart className="text-2xl text-primary" />
          <h1 className="text-2xl font-bold">{userName}'s Cart</h1>
          <span className="badge badge-primary ml-1">{items.length} items</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT: Cart Items ── */}
          <div className="flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="bg-base-100 rounded-xl shadow p-12 text-center opacity-60">
                <FaShoppingCart className="text-5xl mx-auto mb-3" />
                <p className="text-lg font-semibold">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id.toString()}
                  className="bg-base-100 rounded-xl shadow p-4 flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-semibold text-base leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm opacity-60 mt-0.5">
                      Unit price: ৳{item.price}
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => handleDecrease(item._id)}
                    >
                      <FaMinus />
                    </button>
                    <span className="font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => handleIncrease(item._id)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="font-bold text-primary min-w-[70px] text-center">
                    ৳{item.price * item.quantity}
                  </div>

                  {/* Remove */}
                  <button
                    className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                    onClick={() => handleRemove(item._id)}
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-base-100 rounded-xl shadow p-5 sticky top-6">
              <h2 className="text-lg font-bold mb-4 border-b pb-3">
                Order Summary
              </h2>

              {/* Item breakdown */}
              <div className="space-y-2 mb-4 max-h-52 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item._id.toString()}
                    className="flex justify-between text-sm"
                  >
                    <span className="truncate max-w-[55%] opacity-80">
                      {item.title}
                      <span className="ml-1 text-xs opacity-50">
                        ×{item.quantity}
                      </span>
                    </span>
                    <span className="font-medium">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal / Shipping / Total */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Subtotal</span>
                  <span className="font-medium">৳{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70 flex items-center gap-1">
                    <FaTruck className="text-xs" /> Shipping
                  </span>
                  <span className="font-medium">৳{SHIPPING_CHARGE}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-primary">৳{grandTotal}</span>
              </div>

              <Link href="/checkout"                 
                className="btn btn-primary w-full mt-5"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs opacity-50 text-center mt-3">
                Taxes & fees included where applicable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
