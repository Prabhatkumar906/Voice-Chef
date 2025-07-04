// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Get token from the request header
  const token = req.header('Authorization');

  // 2. Check if no token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify the token
  try {
    // The token is in the format "Bearer <token>". We need to remove "Bearer ".
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Add the user payload (which contains the user's ID) to the request object
    req.user = decoded.user;
    next(); // Call next() to proceed to the next function/middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};