 
import { getCartItems } from '@/actions/server/cart';
import CartClient from './../../components/CartClient/CartClient';

const CartPage = async () => {
  const cart = await getCartItems();

  return (
    <div>
      <CartClient  cartItems={cart} />
    </div>
  );
};

export default CartPage;
