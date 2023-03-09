'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError } = require('../../helpers');

const createUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      generateError('Faltan campos', 400);
    }

    let [existingUser] = await connection.query(
      `
        SELECT id, created_at
        FROM users
        WHERE email = ?
      `,
      [email]
    );

    if (existingUser.length > 0) {
      generateError(`Ya existe un usuario con este email`, 409);
    }

    [existingUser] = await connection.query(
      `
        SELECT id, created_at
        FROM users
        WHERE username = ?
      `,
      [username]
    );

    await connection.query(
      `
        INSERT INTO users (email, password, username )
        VALUES (?, SHA2(?, 512), ?)
    `,
      [email, password, username]
    );

    res.status(201).send({
      status: 'ok',
      message: 'Usuario creado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createUser;
