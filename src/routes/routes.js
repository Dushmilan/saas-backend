const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

// Importing route modules for user and product management
const express = require('express');
const router = express.Router();
// Define the base route for user and product management
router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
// This file serves as a central point to export all route modules