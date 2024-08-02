const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');
const redis = require('redis');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


const corsOptions = {
  origin: ['http://localhost:3000', 'http://your-production-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));


const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect().catch(err => {
  console.error('PostgreSQL connection error:', err);
});


const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});


app.get('/api/transactions', async (req, res) => {
  const cacheKey = 'transactions';

  redisClient.get(cacheKey, async (err, cachedData) => {
    if (err) {
      console.error('Redis error:', err);
      return res.status(500).send('Server error');
    }

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    try {
      const result = await client.query('SELECT * FROM transactions');
      redisClient.setex(cacheKey, 600, JSON.stringify(result.rows));
      res.json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Server error');
    }
  });
});


app.post('/api/transactions', async (req, res) => {
  const { holding_id, transaction_type, quantity, transaction_price } = req.body;

  if (!holding_id || !transaction_type || !quantity || !transaction_price) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const result = await client.query(
      'INSERT INTO transactions (holding_id, transaction_type, quantity, transaction_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [holding_id, transaction_type, quantity, transaction_price]
    );

    redisClient.del('transactions'); // Clear cache
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).send('Server error');
  }
});


app.post('/api/create-holding-id', async (req, res) => {
  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).send('Symbol is required');
  }

  try {
    const result = await client.query(
      'INSERT INTO holdings (symbol) VALUES ($1) RETURNING id',
      [symbol]
    );

    const holdingId = result.rows[0].id;
    res.status(201).json({ holding_id: holdingId });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).send('Server error');
  }
});


app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
