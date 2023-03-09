'use strict';

require('dotenv').config();

const getDB = require('./getConnection');

async function createDatabase() {
  let connection;

  try {
    connection = await getDB();
    console.log('Borrando tablas existentes...');

    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS services');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas...');

    await connection.query(`
    CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(150) NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(100),
        last_name VARCHAR(100),
        bio VARCHAR(500),
        img VARCHAR(150),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);

    await connection.query(`
    
    CREATE TABLE services(
        id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
        file_name VARCHAR(600) NOT NULL,
        solved BOOLEAN DEFAULT FALSE,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        username VARCHAR(500) NOT NULL,
        img VARCHAR(150),
        users_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (users_id) REFERENCES users(id)
        )

    `);

    await connection.query(`
    CREATE TABLE comments (
        id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        users_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (users_id) REFERENCES users(id),
        services_id INT UNSIGNED NOT  NULL,
        FOREIGN KEY (services_id) REFERENCES services(id),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        username VARCHAR(100),
        file_name VARCHAR(100),
        comment VARCHAR(600)
    )
    
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

createDatabase();
