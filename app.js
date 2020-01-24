const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mountRoutes(app);

app.listen(3333);
