const Router = require('express-promise-router');

const db = require('../db');

/* cria um novo roteador express-promisse-router
   possui a mesma API do express router normal, porém
   permite o uso de funções assíncronas como manipuladores de rotas
*/
const router = new Router();

// http://localhost:3333/table/create/comments
router.get('/comments', async (request, response) => {
  const query = `CREATE TABLE IF NOT EXISTS COMMENTS(
                     ID integer PRIMARY KEY DEFAULT nextval('serial'),
                     SLUG VARCHAR(100) NOT NULL,
                     COMMENT VARCHAR(400) NOT NULL
                   )`;
  try {
    const result = await db.query(query);
    response.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
  }
});

// http://localhost:3333/table/create/likes
router.get('/likes', async (request, response) => {
  const query = `CREATE TABLE IF NOT EXISTS LIKES (
                  ID SERIAL PRIMARY KEY,
                  SLUG VARCHAR(80) UNIQUE NOT NULL,
                  COUNT INTEGER NOT NULL)`;
  try {
    const result = await db.query(query);
    console.log(result);
    return response.json({ info: 'Tabela criada!' });
  } catch (error) {
    console.log(error.stack);
  }
});

// exporta o roteador para ser montado pelo app
module.exports = router;
