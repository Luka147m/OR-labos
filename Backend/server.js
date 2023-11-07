const express = require('express');
const app = express();

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Gradovi',
  password: 'admin',
  port: 5432,
});

app.get('/getJson', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM gradovijson`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(8080, () => {
  console.log('Server pokrenut na portu 8080');
});
