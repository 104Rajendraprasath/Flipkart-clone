// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading until we verify

  useEffect(() => {
    // This function will run when the app first loads
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Ask the backend if this token is valid
          const response = await API.get('/auth/me');
          // If the backend says yes, set the user data
          setUser(response.data);
        } catch (error) {
          // If the backend says the token is invalid, remove it
          console.error("Session verification failed", error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      // We are done loading, whether we found a user or not
      setLoading(false);
    };

    verifyUser();
  }, []); // The empty array ensures this runs only once on mount

  const signin = async (email, password) => {
    const response = await API.post('/auth/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    // After signing in, we can immediately get the user data
    const userResponse = await API.get('/auth/me');
    setUser(userResponse.data);
  };

  const signup = async (name, email, password) => {
    const response = await API.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', response.data.token);
    // After signing up, get the user data
    const userResponse = await API.get('/auth/me');
    setUser(userResponse.data);
  };

  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signin, signup, signout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};