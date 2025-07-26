// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getProducts } = require('../controllers/productController');

// ... your existing getProducts route is here ...
router.get('/', getProducts);

// TEMPORARY ROUTE TO ADD DUMMY DATA
router.post('/seed', async (req, res) => {
    try {
        // Clear existing products to avoid duplicates
        await Product.deleteMany({}); 

        const dummyProducts = [/* Paste the array from step 1 here */];

        await Product.insertMany(dummyProducts);
        res.status(201).send('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).send('Error seeding database');
    }
});


module.exports = router;