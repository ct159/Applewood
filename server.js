// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;


const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});


app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/transactions/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM transactions WHERE user_id = $1', [userId]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
