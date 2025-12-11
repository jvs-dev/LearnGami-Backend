const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_default';

const generateToken = (userId, role = 'USER') => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};