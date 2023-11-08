const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Gradovi',
  password: 'admin',
  port: 5432,
});

app.post('/getJson', async (req, res) => {
  const { searchInput, selectedField } = req.body;
  //console.log(searchInput + ' ' + selectedField);
  var query = `SELECT * FROM gradovi_kvartovi WHERE `;
  switch (selectedField) {
    case 'sve':
      query += `imegrada LIKE '%${searchInput}%'
        OR zupanija LIKE '%${searchInput}%'
        OR gradonacelnik LIKE '%${searchInput}%'
        OR CAST(brojstanovnika AS TEXT) LIKE '%${searchInput}%'
        OR CAST(povrsina AS TEXT) LIKE '%${searchInput}%'
        OR CAST(godinaosnutka AS TEXT) LIKE '%${searchInput}%'
        OR CAST(latitude AS TEXT) LIKE '%${searchInput}%'
        OR CAST(longitude AS TEXT) LIKE '%${searchInput}%'
        OR CAST(nadmorskavisina AS TEXT) LIKE '%${searchInput}%'
        OR nazivkvarta LIKE '%${searchInput}%'
        OR CAST(brojkvartstan AS TEXT) LIKE '%${searchInput}%';
    `;
      break;
    case 'ime':
      query += `imegrada LIKE '%${searchInput}%'`;
      break;
    case 'zupanija':
      query += `zupanija LIKE '%${searchInput}%'`;
      break;
    case 'gradonacelnik':
      query += `gradonacelnik LIKE '%${searchInput}%'`;
      break;
    case 'broj':
      query += `CAST(brojstanovnika AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'povrsina':
      query += `CAST(povrsina AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'godina':
      query += `CAST(godinaosnutka AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'latitude':
      query += `CAST(latitude AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'longitude':
      query += `CAST(longitude AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'nadmorska':
      query += `CAST(nadmorskavisina AS TEXT) LIKE '%${searchInput}%'`;
      break;
    case 'kvart':
      query += `nazivkvarta LIKE '%${searchInput}%'`;
      break;
    case 'kvartbroj':
      query += `CAST(brojkvartstan AS TEXT) LIKE '%${searchInput}%'`;
      break;
  }
  //console.log(query);
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(8080, () => {
  console.log('Server pokrenut na portu 8080');
});
