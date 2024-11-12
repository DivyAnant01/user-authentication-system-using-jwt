const jwt = require('jsonwebtoken');
const { logger } = require('../config/logger'); 
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: 'Access Denied: Invalid token' });
  }
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      logger.warn(`Unauthorized access attempt by user ${req.user.userId} to ${req.originalUrl}`);
      return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
    }
    next(); 
  };
};

module.exports = { verifyToken, authorizeRole };
