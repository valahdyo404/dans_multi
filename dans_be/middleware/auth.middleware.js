const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      next(new ErrorResponse('Authentication required', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ErrorResponse('Invalid token', 401));
  }
};

module.exports = authMiddleware;
