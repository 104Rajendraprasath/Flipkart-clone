import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import API from '../api';

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Products For You
        </h1>

        {products.length > 0 ? (
          // Responsive Grid for Products
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // Optional: Loading State or Empty State
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">Loading products...</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default LandingPage;