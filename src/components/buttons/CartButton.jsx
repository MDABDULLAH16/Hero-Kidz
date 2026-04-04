'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartButton = ({ product }) => {
   const user = false;
   const router = useRouter();
   const path = usePathname();

   const handleAddToCart = (e) => {
     e.preventDefault();
     if (!user) {
       router.push(`/login?callbackUrl=${path}`);
     } else {
        alert('Product added to cart:', product);
     }
   };

    return (
      <button
        title="Add To Cart"
        onClick={handleAddToCart}
        className="btn btn-primary btn-sm flex-1"
      >
        <FaShoppingCart />
      </button>
    );
};

export default CartButton;