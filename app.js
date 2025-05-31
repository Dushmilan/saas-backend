require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const port = process.env.PORT || 3000;
const routes = require('./routes');

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Initialize database connection
async function initDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add database test route
app.get('/db-test', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message 
    });
  }
});
// Handle routes
app.use('/api', routes);

// Start server only after database connection
initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});