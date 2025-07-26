import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
// The CSS module import is no longer needed:
// import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    // Main nav container: blue background, white text, padding, shadow
    <nav className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
      
      <div className="flex items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold italic">
          FlipkartClone
        </Link>
      </div>

      {/* Right-side navigation links */}
      <div className="flex items-center space-x-8"> {/* `space-x-8` adds margin between child elements */}
        
        {/* Cart Link */}
        <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-200 transition-colors">
          <span className="font-medium">Cart</span>
          {/* Cart item count badge */}
          {user && (
            <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Conditional Rendering for User Auth */}
        {user ? (
          // If user is logged in
          <div className="flex items-center space-x-4">
            <span className="font-medium hidden sm:block">Welcome!</span> {/* Hidden on small screens */}
            <button
              onClick={signout}
              className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-sm hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          // If user is not logged in
          <Link
            to="/signin"
            className="bg-white text-blue-600 font-semibold px-6 py-1.5 rounded-sm hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;