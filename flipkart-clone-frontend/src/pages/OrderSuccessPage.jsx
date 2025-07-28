// src/pages/OrderSuccessPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        
        {/* Checkmark Icon */}
        <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>

        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>
        
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your purchase. We've received your order and are getting it ready for you.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block w-full max-w-xs bg-blue-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;