// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const axios = require('axios'); // Make sure axios is imported
const { getProducts } = require('../controllers/productController');

router.get('/', getProducts);

// NEW AND IMPROVED SEEDING ROUTE
router.post('/seed', async (req, res) => {
    try {
        // 1. Fetch data from the external Fake Store API
        const { data: externalProducts } = await axios.get('https://fakestoreapi.com/products');

        if (!externalProducts) {
            return res.status(500).send('Could not fetch products from Fake Store API.');
        }

        // 2. Map the fetched data to match our Product schema
        const productsToSave = externalProducts.map(product => ({
            name: product.title,       // Map 'title' to our 'name' field
            price: product.price,      // Price field matches
            imageUrl: product.image,   // Map 'image' to our 'imageUrl' field
        }));

        // 3. Clear existing products and insert the new ones
        await Product.deleteMany({});
        await Product.insertMany(productsToSave);

        res.status(201).send('Database seeded successfully with data from Fake Store API!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
        res.status(500).send('Error seeding database');
    }
});

module.exports = router;