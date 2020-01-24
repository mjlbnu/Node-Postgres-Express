const users = require('./user');

module.exports = app => {
  app.get('/', (request, response) => {
    return response.json({ info: 'Node.js, Express and Postgres API' });
  });
  app.use('/users', users);
  app.use('/users/:id', users);
  // ... demais rotas
};
