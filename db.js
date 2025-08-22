const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farmabusca',
  password: '6747',
  port: 5432,
});

module.exports = pool;