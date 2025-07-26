// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to add a call to verify the token with the backend here
      // For simplicity, we'll just assume the token is valid
      // A better approach is to have a /api/auth/me endpoint to get user data
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const signin = async (email, password) => {
    const response = await API.post('/auth/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ token: response.data.token });
  };

  const signup = async (name, email, password) => {
    const response = await API.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ token: response.data.token });
  };

  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};