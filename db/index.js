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

module.exports = {
  query: (text, params) => pool.query(text, params),
};
