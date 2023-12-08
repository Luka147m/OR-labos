const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Ajv = require('ajv');
const ajv = new Ajv();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const addRequestSchema = require('./addRequestSchema.json');
const updateRequestSchema = require('./updateRequestSchema.json');

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
    res.setHeader('Content-Type', 'application/json');
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
      .sendWrapper(
        'Bad Request',
        'Request failed schema validation (https://github.com/Luka147m/OR-labos/blob/main/backend/addRequestSchema.json)',
        null
      );
  }

  next();
};

const validateUpdateRequestBody = (req, res, next) => {
  const validate = ajv.compile(updateRequestSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res
      .status(400)
      .sendWrapper(
        'Bad Request',
        'Request failed schema validation (https://github.com/Luka147m/OR-labos/blob/main/backend/updateRequestSchema.json)',
        null
      );
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
  const id = req.params.id;
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

  try {
    const result = await pool.query(`SELECT getGradById(${id})`);
    res
      .status(200)
      .sendWrapper(
        'OK',
        `Entry added successfully with id: ${id}`,
        result.rows[0].getgradbyid
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

app.put('/api/modify/:id', validateUpdateRequestBody, async (req, res) => {
  const id = req.params.id;
  var query = `UPDATE gradovi
  SET `;

  Object.keys(req.body).forEach((key) => {
    if (key == 'kvartovi') return;
    const value =
      typeof req.body[key] === 'string' ? `'${req.body[key]}'` : req.body[key];
    query += `${key} = ${value}, `;
  });
  query = query.replace(/,\s*$/, '');
  query += ` WHERE id = ${id};`;

  try {
    const result = await pool.query(query);
    if (result.rowCount == 0) {
      res
        .status(404)
        .sendWrapper('OK', `Entry with id: ${id} has not been found`, null);
    } else {
      res
        .status(200)
        .sendWrapper('OK', `Entry with id: ${id} has been updated`, null);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .sendWrapper(
        'Internal server error',
        'Unable to delete data from database',
        null
      );
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  const id = req.params.id;
  var query = `DELETE FROM gradovi WHERE id = ${id}`;
  try {
    const result = await pool.query(query);
    if (result.rowCount == 0) {
      res
        .status(404)
        .sendWrapper('OK', `Entry with id: ${id} has not been found`, null);
    } else {
      res
        .status(200)
        .sendWrapper('OK', `Deleted entry with id: ${id} from database`, null);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .sendWrapper(
        'Internal server error',
        'Unable to delete data from database',
        null
      );
  }
});

app.get('*', function (req, res) {
  res
    .status(501)
    .sendWrapper(
      'Not implemented',
      `Method ${req.method} for route ${req.url} has not been implemented yet`,
      null
    );
});

app.listen(8080, () => {
  console.log('Server pokrenut na portu 8080');
});
