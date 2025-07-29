// server.js

require('dotenv').config(); // Make sure this is at the very top
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

const app = express();

// --- THE DEFINITIVE CORS FIX IS HERE ---

// 1. Define your "guest list" - the origins that are allowed to make requests.
const allowedOrigins = [
  'http://localhost:5173',                         // Your local frontend for development
  'http://localhost:5174',                         // Another common Vite port, just in case
  'https://astonishing-rabanadas-cafe89.netlify.app' // YOUR DEPLOYED NETLIFY FRONTEND
];

// 2. Create the CORS options object.
const corsOptions = {
  origin: (origin, callback) => {
    // The 'origin' is the URL of the site making the request (e.g., your Netlify URL)
    // We check if the incoming origin is on our guest list.
    // `!origin` allows requests that don't have an origin (like Postman or mobile apps).
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If it is, allow the request to proceed.
      callback(null, true);
    } else {
      // If it's not on the list, block the request with an error.
      callback(new Error('This origin is not allowed by CORS policy.'));
    }
  }
};

// 3. Use the new specific CORS options in your app.
app.use(cors(corsOptions));

// --- END OF CORS FIX ---


// Connect Database
connectDB();

// Init Middleware
// Note: The order is important. CORS should generally come before your routes.
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));