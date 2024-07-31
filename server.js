const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');
const redis = require('redis');

const app = express();
const port = 3000;


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
client.connect();


const redisClient = redis.createClient();
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
      console.error(error);
      res.status(500).send('Server error');
    }
  });
});


app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
