// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const response = await API.get('/cart');
        setCart(response.data);
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
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};