const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  url: process.env.DB_URL,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});

const getUsers = (request, response) => {
  pool.on('connect', () => {
    console.log('connected to the db');
  });

  pool.query('SELECT * FROM users ORDER BY id DESC', (error, results) => {
    if (error) {
      console.log('Ocorreu um erro!');
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email, password, created_at, updated_at } = request.body;

  pool.query(
    'INSERT INTO users (name, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
    [name, email, password, created_at, updated_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.fields[0]);
    }
  );
};

const createUser2 = async (request, response) => {
  const { name, email, password } = request.body;
  const now = new Date();
  // Parameterized query
  const text = `INSERT INTO users (name, email, password_hash, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`;
  const values = [name, email, password, now, now];

  try {
    const result = await pool.query(text, values);
    console.log(result.rows[0]);
    console.log(result.rowCount);
    console.log(result.command);
    response.status(200).send(result.rows[0]);
    await pool.end();
  } catch (err) {
    console.log(err.stack);
  }
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createUser2,
};
