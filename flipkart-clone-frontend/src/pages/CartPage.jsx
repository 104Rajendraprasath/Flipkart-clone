import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  
  const totalPrice = cart.reduce((total, item) => 
    total + item.product.price * item.quantity, 0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Cart Items Section (Left Column) */}
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

            {cart.length === 0 ? (
              // Empty Cart State
              <div className="bg-white text-center p-12 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-900">Your cart is empty.</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-block w-full max-w-xs bg-blue-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              // Populated Cart State
              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {cart.map(item => (
                  <li key={item.product._id} className="py-2">
                    <CartItem item={item} removeFromCart={removeFromCart} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Order Summary (Right Column) */}
          {cart.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 lg:sticky lg:top-24"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${totalPrice.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                >
                  Checkout
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;