"use client";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { title, image, price, discount, ratings, sold, _id } = product;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      {/* Image */}
      <figure className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-[220px] object-cover"
        />

        {discount > 0 && (
          <span className="badge badge-error absolute top-2 left-2 text-white">
            -{discount}%
          </span>
        )}
      </figure>

      {/* Body */}
      <div className="card-body p-4 space-y-2">
        {/* Title */}
        <h2 className="font-semibold text-sm line-clamp-2">{title}</h2>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Rating + Sold */}
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            {ratings}
          </div>

          <span>{sold} sold</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            title="See details"
            href={`/products/${_id}`}
            className="btn btn-outline btn-sm flex-1"
          >
            <FaEye />
          </Link>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
