const express = require('express');

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Omnistack2' });
})

app.listen(3333);