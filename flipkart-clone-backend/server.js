// server.js

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// --- THE SIMPLER, MORE RELIABLE CORS FIX ---

// 1. Define your "guest list" - the origins that are allowed to make requests.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://astonishing-rabanadas-cafe89.netlify.app'
];

// 2. Pass the array directly to the cors origin option.
// The `cors` library will handle the checking for you.
// It's smarter than a simple indexOf check.
app.use(cors({ origin: allowedOrigins }));

// --- END OF CORS FIX ---


// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
