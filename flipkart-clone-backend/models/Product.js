
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// router.post('/add-dummy', async (req, res) => {
//   try {
//       const products = [
//           { name: 'Laptop', price: 1200, imageUrl: 'image_url' },
//           { name: 'Smartphone', price: 800, imageUrl: 'image_url' },
//           // ... add at least 10 products
//       ];
//       await Product.insertMany(products);
//       res.send('Dummy products added');
//   } catch (err) {
//       res.status(500).send('Server Error');
//   }
// });

module.exports = mongoose.model('Product', ProductSchema);