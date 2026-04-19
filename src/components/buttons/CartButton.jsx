'use client';
import { addToCart } from '@/actions/server/cart';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CartButton = ({ product }) => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
   const router = useRouter();
  const path = usePathname();
  const [isLoading,setIsLoading] =  useState(false);

  const handleAddToCart = async (e) => {
     setIsLoading(true);
     e.preventDefault();
     if (!isAuthenticated) {
       router.push(`/login?callbackUrl=${path}`);
     } else {
       const cart = await addToCart(product, true);
        if (cart.success) {
          Swal.fire('Success', cart.message, 'success');
        } else {
          Swal.fire('Error', 'Failed to add product to cart. Please try again.', 'error');
       }
       setIsLoading(false);
     }
   };

    return (
      <button
        disabled={session.status === 'loading' || isLoading}
        title="Add To Cart"
        onClick={handleAddToCart}
        className="btn btn-primary btn-sm flex-1"
      >
        <FaShoppingCart />
      </button>
    );
};

export default CartButton;