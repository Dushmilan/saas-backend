const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authMiddleware');

// Define routes for user management
router.use(express.json());
//redirect to userController
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', middleware, userController.updateUser);
router.delete('/:id', middleware, userController.deleteUser);

module.exports = router;