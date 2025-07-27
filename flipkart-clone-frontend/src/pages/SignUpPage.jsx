import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const SignUpPage = () => {
  const [name, setName] = useState(''); // Added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for signup errors
  const { signup } = useContext(AuthContext); // Using the correct signup function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    // Optional: Add simple password validation
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
      // Pass all required fields to the signup function
      await signup(name, email, password);
      navigate('/signin');
    } catch (err) {
      // Set a user-friendly error message
      setError('Failed to create account. The email may already be in use.');
      console.error('Failed to sign up', err);
    }
  };

  return (
    // Main container to center the form on the page
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        {/* Form Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create Your Account
        </h2>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 sr-only">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password" // Use "new-password" for signup forms
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 text-center text-sm text-red-800 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Link to Sign In Page */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;