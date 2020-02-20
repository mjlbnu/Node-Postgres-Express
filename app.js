const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const port = 3333;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mountRoutes(app);

app.listen(port);
