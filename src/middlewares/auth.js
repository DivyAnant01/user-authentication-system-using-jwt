const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const SECRET_KEY = 'your_secret_key';

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error('Invalid or expired token');
      return res.status(401).send('Invalid or expired token');
    }
    req.user = decoded; 
    next();
  });
}

function roleRequired(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      logger.warn(`Access denied: User ${req.user.username} tried to access a restricted route`);
      return res.status(403).send('Forbidden: Insufficient permissions');
    }
    next();
  };
}

module.exports = { verifyToken, roleRequired };
