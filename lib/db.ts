import mysql from 'mysql2/promise';

//database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin1',
  password: 'admin1',
  database: 'searchrecipes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
