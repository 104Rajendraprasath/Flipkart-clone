import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
// The CSS module import is no longer needed:
// import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    // Card container: white background, rounded corners, shadow, and a subtle hover effect
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="h-52 w-full flex justify-center items-center p-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain" 
        />
      </div>

      {/* Product Details Section */}
      <div className="p-4 text-center">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 h-14"> {/* Fixed height to align titles */}
          {product.name}
        </h3>

        {/* Product Price */}
        <p className="text-2xl font-bold text-gray-900 my-2">
          ${product.price}
        </p>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product._id, 1)}
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;