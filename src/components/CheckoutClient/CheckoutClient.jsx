"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaHashtag,
  FaShieldAlt,
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaTag,
} from "react-icons/fa";
import Swal from "sweetalert2";

/* ── Mock order data – replace with real props/context ── */
 
const SHIPPING_CHARGE = 60;

/* ── Field wrapper ── */
const Field = ({ label, icon: Icon, error, children }) => (
  <div className="form-control w-full">
    <label className="label pb-1">
      <span className="label-text font-semibold flex items-center gap-2 text-sm">
        {Icon && <Icon className="text-primary opacity-80" />}
        {label}
      </span>
    </label>
    {children}
    {error && (
      <label className="label pt-0.5">
        <span className="label-text-alt text-error text-xs">
          {error.message}
        </span>
      </label>
    )}
  </div>
);

const CheckoutClient = ({ cartItems = [] }) => {
  const session = useSession();
  if (!session) {
    return null;
  }

  const [submitted, setSubmitted] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const shippingCost = shippingMethod === "express" ? 120 : SHIPPING_CHARGE;
  const total = subtotal + shippingCost;

  const onSubmit = async (data) => {
    const result = await createOrder(data);
      if (result.success) {
          setSubmitted(true);
      } else {
          Swal.fire({
              icon: "error",
              title: "Order Failed",
              text: result.message || "An error occurred while placing your order.",
          });
      }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="bg-base-100 rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <FaCheckCircle className="text-6xl text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
          <p className="opacity-60 text-sm mb-6">
            Thank you for your purchase. You'll receive a confirmation email
            shortly.
          </p>
          <div className="badge badge-success badge-outline p-3 text-sm font-semibold">
            Total Paid: ৳{total}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page title */}
        <div className="mb-7">
          <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-sm opacity-50 mt-1">
            Complete your shipping details to place your order
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ══════════════════════════════
                LEFT  –  Shipping Information
               ══════════════════════════════ */}
            <div className="flex-1 space-y-5">
              {/* Personal Info card */}
              <div className="bg-base-100 rounded-2xl shadow p-6">
                <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                  <FaUser className="text-primary" /> Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    icon={FaUser}
                    error={errors.fullName}
                  >
                    <input
                      defaultValue={session?.data?.user?.name}
                      className={`input input-bordered w-full ${errors.fullName ? "input-error" : ""}`}
                      placeholder="Md. Abdullah"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "At least 3 characters",
                        },
                      })}
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    icon={FaEnvelope}
                    error={errors.email}
                  >
                    <input
                      readOnly
                      value={cartItems[0]?.email || ""}
                      type="email"
                      className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </Field>

                  <Field
                    label="Phone Number"
                    icon={FaPhone}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      className={`input input-bordered w-full ${errors.phone ? "input-error" : ""}`}
                      placeholder="01XXXXXXXXX"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^01[3-9]\d{8}$/,
                          message: "Enter a valid BD number",
                        },
                      })}
                    />
                  </Field>
                </div>
              </div>

              {/* Address card */}
              <div className="bg-base-100 rounded-2xl shadow p-6">
                <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Street / Area"
                    icon={FaMapMarkerAlt}
                    error={errors.address}
                  >
                    <input
                      className={`input input-bordered w-full ${errors.address ? "input-error" : ""}`}
                      placeholder="House #, Road #, Area"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                  </Field>

                  <Field label="City" icon={FaCity} error={errors.city}>
                    <input
                      className={`input input-bordered w-full ${errors.city ? "input-error" : ""}`}
                      placeholder="Dhaka"
                      {...register("city", { required: "City is required" })}
                    />
                  </Field>

                  <Field label="District" icon={FaFlag} error={errors.district}>
                    <select
                      className={`select select-bordered w-full ${errors.district ? "select-error" : ""}`}
                      {...register("district", {
                        required: "District is required",
                      })}
                    >
                      <option value="">Select district</option>
                      {[
                        "Dhaka",
                        "Chattogram",
                        "Sylhet",
                        "Rajshahi",
                        "Khulna",
                        "Barishal",
                        "Mymensingh",
                        "Rangpur",
                        "Gazipur",
                        "Narayanganj",
                      ].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Postal Code"
                    icon={FaHashtag}
                    error={errors.postal}
                  >
                    <input
                      className={`input input-bordered w-full ${errors.postal ? "input-error" : ""}`}
                      placeholder="1200"
                      {...register("postal", {
                        required: "Postal code is required",
                        pattern: {
                          value: /^\d{4}$/,
                          message: "Enter a valid 4-digit postal code",
                        },
                      })}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      label="Delivery Notes (optional)"
                      icon={null}
                      error={errors.notes}
                    >
                      <textarea
                        className="textarea textarea-bordered w-full resize-none"
                        rows={2}
                        placeholder="Landmark, gate color, any helpful info..."
                        {...register("notes")}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Shipping method card */}
              <div className="bg-base-100 rounded-2xl shadow p-6">
                <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                  <FaTruck className="text-primary" /> Shipping Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: "standard",
                      label: "Standard Delivery",
                      sub: "3-5 business days",
                      price: "৳60",
                    },
                    {
                      id: "express",
                      label: "Express Delivery",
                      sub: "1-2 business days",
                      price: "৳120",
                    },
                  ].map(({ id, label, sub, price }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all
                        ${shippingMethod === id ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/40"}`}
                    >
                      <input
                        type="radio"
                        className="radio radio-primary"
                        checked={shippingMethod === id}
                        onChange={() => setShippingMethod(id)}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{label}</p>
                        <p className="text-xs opacity-50">{sub}</p>
                      </div>
                      <span className="font-bold text-primary text-sm">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════
                RIGHT  –  Order Summary
               ══════════════════════════ */}
            <div className="w-full lg:w-85 shrink-0">
              <div className="bg-base-100 rounded-2xl shadow p-6 sticky top-6">
                <h2 className="font-bold text-base mb-4 flex items-center gap-2 border-b pb-3">
                  <FaBoxOpen className="text-primary" /> Order Summary
                </h2>

                {/* Item list */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-11 h-11 rounded-lg object-cover shrink-0 border border-base-300"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">
                          {item.title}
                        </p>
                        <p className="text-xs opacity-50">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold whitespace-nowrap">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-40" />
                    <input
                      className="input input-bordered input-sm w-full pl-8 text-xs"
                      placeholder="Promo code"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Apply
                  </button>
                </div>

                {/* Pricing breakdown */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">
                      Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60 flex items-center gap-1">
                      <FaTruck className="text-xs" />
                      Shipping ({shippingMethod})
                    </span>
                    <span className="font-medium">৳{shippingCost}</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between font-extrabold text-base">
                  <span>Total</span>
                  <span className="text-primary text-lg">৳{total}</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn btn-primary w-full mt-5 ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order →"}
                </button>

                {/* Trust badge */}
                <div className="flex items-center justify-center gap-2 mt-4 opacity-40 text-xs">
                  <FaShieldAlt />
                  <span>Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutClient;
