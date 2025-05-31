const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Mount API routes
router.use('/api/users', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404 handler - must be last
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;