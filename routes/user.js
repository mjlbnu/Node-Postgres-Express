const Router = require('express-promise-router');

const db = require('../db');

/* cria um novo roteador express-promisse-router
   possui a mesma API do express router normal, porém
   permite o uso de funções assíncronas como manipuladores de rotas
*/
const router = new Router();

router.get('/users', async (request, response) => {
  const query = 'SELECT * FROM USERS ORDER BY ID DESC';
  const result = await db.query(query);
  response.status(200).json(result.rows);
});

router.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const query = 'SELECT * FROM USERS WHERE ID =$1';
  const result = await db.query(query, [id]);
  response.status(200).json(result.rows[0]);
});

router.post('/user', async (request, response) => {
  const { name, email, password } = request.body;
  const now = new Date();
  const query = `INSERT INTO USERS (NAME, EMAIL, PASSWORD_HASH, CREATED_AT, UPDATED_AT)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`;
  const values = [name, email, password, now, now];

  try {
    const result = await db.query(query, values);
    response.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

router.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, password } = request.body;
  const now = new Date();
  const query = `UPDATE USERS SET NAME = $1, PASSWORD_HASH = $2,
                 UPDATED_AT = $3 WHERE ID = $4 RETURNING *`;
  const values = [name, password, now, id];
  try {
    const result = await db.query(query, values);
    response.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

router.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const query = `DELETE FROM USERS WHERE ID = $1 RETURNING *`;
  const values = [id];
  try {
    const result = await db.query(query, values);
    response.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

// exporta nosso roteador para ser montado pelo app
module.exports = router;
