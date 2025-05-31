const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup, validateLogin } = require('../middleware/validateRequest');
const { loginLimiter, signupLimiter } = require('../middleware/rateLimiter');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signupLimiter, validateSignup, userController.createUser);
router.post('/login', loginLimiter, validateLogin, userController.loginUser);

// Protected routes
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;