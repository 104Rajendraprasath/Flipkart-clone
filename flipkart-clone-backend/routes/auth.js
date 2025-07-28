// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, signin,getLoggedInUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/signin', signin);

// ADD THIS NEW ROUTE
router.get('/me',auth,getLoggedInUser);

module.exports = router;