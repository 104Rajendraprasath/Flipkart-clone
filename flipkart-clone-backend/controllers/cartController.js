// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const user = await User.findById(req.user.id);
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

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};