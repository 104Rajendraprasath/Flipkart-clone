// server/controllers/cartController.js

const User = require('../models/User');
const Product = require('../models/Product');

// This function can remain as is, it's not part of the bug.
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- THIS IS THE DEFINITIVE FIX FOR addToCart ---
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let user = await User.findById(req.user.id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        // 1. Save the changes to the user document.
        await user.save();

        // 2. IMPORTANT: Re-fetch the user with the cart populated. This guarantees we have the full data.
        const updatedUser = await User.findById(req.user.id).populate('cart.product');
        
        // 3. Send the fully populated cart in the response.
        res.json(updatedUser.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// --- THIS IS THE DEFINITIVE FIX FOR removeFromCart ---
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        let user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);

        // 1. Save the changes.
        await user.save();
        
        // 2. Re-fetch the user with the cart populated.
        const updatedUser = await User.findById(req.user.id).populate('cart.product');

        // 3. Send the fully populated cart in the response.
        res.json(updatedUser.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add this new function to your cartController.js file

exports.updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        let user = await User.findById(req.user.id);
        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex > -1) {
            // If the new quantity is 0 or less, remove the item from the array
            if (quantity <= 0) {
                user.cart.splice(cartItemIndex, 1);
            } else {
                // Otherwise, update the quantity
                user.cart[cartItemIndex].quantity = quantity;
            }

            await user.save();
            const updatedUser = await User.findById(req.user.id).populate('cart.product');
            res.json(updatedUser.cart);

        } else {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.checkout = async (req, res) => {
    try {
        // Find the user by the ID from the authenticated token
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Clear the cart
        user.cart = [];

        // Save the changes to the database
        await user.save();

        // Send a success response
        res.status(200).json({ msg: 'Checkout successful, cart cleared.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};