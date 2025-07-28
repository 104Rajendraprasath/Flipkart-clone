// In your routes/cart.js file

const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartItemQuantity,checkout } = require('../controllers/cartController'); // <-- Import the new function
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/:productId', auth, removeFromCart);
router.patch('/:productId', auth, updateCartItemQuantity); // <-- ADD THIS NEW ROUTE
router.post('/checkout', auth, checkout);

module.exports = router;