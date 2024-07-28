const Pool = require('pg').Pool;
const { dotenv } = require('../config/config')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
  
pool.connect((err) => {
    if (err) {
      console.error('Connection error', err.stack, err.message, err.name);
    } else {
      console.log('Connected to database');
    }
});

module.exports = pool;