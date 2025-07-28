// src/components/CartItem.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const { product, quantity } = item;

  if (!product) {
    return null; // Don't render if product data is missing
  }

  const handleIncrease = () => {
    updateQuantity(product._id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product._id, quantity - 1);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        
        {/* --- QUANTITY CONTROLS --- */}
        <div className="flex items-center gap-3 mt-2">
          <button onClick={handleDecrease} className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold hover:bg-gray-300">-</button>
          <span className="font-semibold text-lg">{quantity}</span>
          <button onClick={handleIncrease} className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold hover:bg-gray-300">+</button>
        </div>
        
        <button 
          onClick={() => removeFromCart(product._id)}
          className="mt-3 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
      
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;