const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const Ajv = require('ajv');
const ajv = new Ajv();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const addRequestSchema = require('./addRequestSchema.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Gradovi',
  password: 'admin',
  port: 5432,
});

function wrapResponse(req, res, next) {
  res.sendWrapper = (status, message, data) => {
    const response = {
      status,
      message,
      response: data,
    };
    res.json(response);
  };
  next();
}

app.use(wrapResponse);

const validateRequestBody = (req, res, next) => {
  const validate = ajv.compile(addRequestSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res
      .status(400)
      .wrapResponse('Bad Request', 'Request failed schema validation ()', null);
  }

  next();
};

app.post('/getJson', async (req, res) => {
  const { searchInput, selectedField } = req.body;
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

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/getAll', async (req, res) => {
  var query = `SELECT * FROM gradovijson`;
  try {
    const result = await pool.query(query);
    res
      .status(200)
      .sendWrapper(
        'OK',
        'Fetched all entries from database',
        result.rows[0].json_agg
      );
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .sendWrapper(
        'Internal server error',
        'Unable to retrieve data from database',
        null
      );
  }
});

app.get('/api/get/:id', async (req, res) => {
  const id = req.params.id;
  var query = `SELECT getGradById(${id})`;
  try {
    const result = await pool.query(query);

    if (result.rows[0].getgradbyid == null) {
      res
        .status(404)
        .sendWrapper(
          'Not found',
          `Failed to find entry matching the id: ${id}`,
          result.rows[0].getgradbyid
        );
    } else {
      res
        .status(200)
        .sendWrapper(
          'OK',
          `Fetched all entries from database matching the id: ${id}`,
          result.rows[0].getgradbyid
        );
    }
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .sendWrapper(
        'Internal server error',
        'Unable to retrieve data from database',
        null
      );
  }
});

app.get('/api/getCity/:id', async (req, res) => {
  const Id = req.params.id;
});

app.post('/api/add', validateRequestBody, async (req, res) => {
  var id;
  var queryGradovi = `INSERT INTO gradovi (
    imegrada, zupanija, gradonacelnik, brojstanovnika,
    povrsina, nadmorskavisina, godinaosnutka, latitude, longitude
    ) VALUES (
      '${req.body.imegrada}',
      '${req.body.zupanija}',
      '${req.body.gradonacelnik}',
      ${req.body.brojstanovnika},
      ${req.body.povrsina},
      ${req.body.nadmorskavisina},
      ${req.body.godinaosnutka},
      ${req.body.latitude},
      ${req.body.longitude}
    ) RETURNING id;`;

  try {
    const result = await pool.query(queryGradovi);
    id = result.rows[0].id;
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .sendWrapper(
        'Internal server error',
        'Unable to retrieve data from database',
        null
      );
  }

  req.body.kvartovi.forEach((kvart) => {
    var queryKvartovi = `INSERT INTO kvartovi (gradid, nazivkvarta, brojstanovnika) 
    VALUES ( 
      ${id},
      '${kvart.nazivkvarta}',
      ${kvart.brojkvartstan}
    )`;

    try {
      pool.query(queryKvartovi);
    } catch (error) {
      console.error('Error executing query', error);
      res
        .status(500)
        .sendWrapper(
          'Internal server error',
          'Unable to retrieve data from database',
          null
        );
    }
  });

  res.sendWrapper('OK', `Entry added successfully with id: ${id}`, null);
});

app.put('/api/modify', async (req, res) => {});

app.delete('/api/delete/:id', async (req, res) => {
  const Id = req.params.id;
});

app.listen(8080, () => {
  console.log('Server pokrenut na portu 8080');
});
