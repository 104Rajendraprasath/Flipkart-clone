// src/api/index.js
import axios from 'axios';

// 1. Read the base URL from the environment variable.
const API_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Check if the URL was found. If not, throw an error to prevent hard-to-debug issues.
if (!API_URL) {
  throw new Error("VITE_API_BASE_URL is not defined. Please check your .env file.");
}

// 3. Create the Axios instance. We append '/api' here.
const API = axios.create({
  baseURL: `${API_URL}/api`, // e.g., 'https://flipkart-clone-qyi7.onrender.com/api'
});

// 4. The interceptor remains the same. It correctly adds the auth token to every request.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;