// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        setLoading(true);
        try {
          // This call is now redundant because AuthContext provides the populated cart,
          // but it's good for re-syncing if needed.
          const response = await API.get('/cart');
          setCart(response.data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
          setCart([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCart([]);
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity) => {
    const response = await API.post('/cart', { productId, quantity });
    setCart(response.data);
  };

  const removeFromCart = async (productId) => {
    const response = await API.delete(`/cart/${productId}`);
    setCart(response.data);
  };

  // --- NEW FUNCTION TO UPDATE QUANTITY ---
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await API.patch(`/cart/${productId}`, { quantity: newQuantity });
      setCart(response.data);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };
  
  const cartCount = cart.filter(item => item && item.product).reduce((count, item) => count + item.quantity, 0);
  const handleCheckout = async () => {
    try {
      // Tell the backend to clear the cart
      await API.post('/cart/checkout');
      // Manually clear the cart on the frontend to reflect the change instantly
      setCart([]);
    } catch (error) {
      console.error("Checkout failed", error);
      // Optionally, show an error message to the user
    }
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount, loading, updateQuantity,handleCheckout }}>
      {children}
    </CartContext.Provider>
  );
};