const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
    // Token is valid, store user data in request for further use
    req.user = decoded.user;
    next();
  });
}

module.exports = verifyToken;
