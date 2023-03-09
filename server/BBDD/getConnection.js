'use strict';

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
let pool;
async function getDB() {
  try {
    // - Si no existe un grupo de conexiones lo creamos.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: 'Z',
      });
    }
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
    throw new Error('Error al conectar con MySQL');
  }
}
//- Exportamos getDB.
module.exports = getDB;
