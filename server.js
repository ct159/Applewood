const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://your-production-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// PostgreSQL client setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

// API endpoint for transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM transactions');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for any request that doesn't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
