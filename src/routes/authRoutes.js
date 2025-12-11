const express = require('express');
const { register, login, getUserData, getUserCount } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUserData);
router.get('/count', authMiddleware, getUserCount);

module.exports = router;