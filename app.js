require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/routes');

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/', routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;