import { getCartItems } from '@/actions/server/cart';
import CheckoutClient from '@/components/CheckoutClient/CheckoutClient';
import React from 'react';

const Checkout = async() => {
    const cartItems = await getCartItems()
    return (
        <div>
            <CheckoutClient cartItems={cartItems} ></CheckoutClient>
        </div>
    );
};

export default Checkout;