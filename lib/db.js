import mysql from 'mysql2/promise';

// Create a database connection pool
const pool = mysql.createPool({
  host: 'localhost',  // Update if necessary
  user: 'admin1',       // Your MySQL username
  password: 'admin1',       // Your MySQL password
  database: 'searchrecipes',  // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
