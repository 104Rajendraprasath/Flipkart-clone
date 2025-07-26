import React from 'react';

// This component expects two props:
// 1. `item`: An object containing the cart item details (e.g., item.product.name, item.product.price, etc.)
// 2. `removeFromCart`: A function to call when the remove button is clicked.

function CartItem({ item, removeFromCart }) {
  // Destructure for easier access
  const { product, quantity } = item;

  // Handle cases where product might not be loaded yet
  if (!product) {
    return null; // Or a loading skeleton
  }

  return (
    // Main container for a single cart item
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain rounded" // `object-contain` prevents image stretching
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow"> {/* `flex-grow` makes this section take up available space */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        
        {/* Remove Button */}
        <button 
          onClick={() => removeFromCart(product._id)}
          className="mt-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
      
      {/* Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>

    </div>
  );
}

export default CartItem;