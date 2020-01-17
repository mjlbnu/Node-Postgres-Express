const express = require('express');
const db = require('./queries')

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Omnistack2' });
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(3333);