// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if there's a header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // The header format is "Bearer <token>". We split it and take the second part.
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Token format is incorrect, authorization denied' });
    }

    const decoded = jwt.verify(token, 'your_jwt_secret'); // Make sure this secret matches!
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};