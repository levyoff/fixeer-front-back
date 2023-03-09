'use strict';

const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const getDB = require('../../BBDD/getConnection');

const loginUser = async (req, res, next) => {
  let connection;

  try {
    // - Obtenemos una conexión.
    connection = await getDB();

    // - Recuperamos el email y el password del body.
    const { email, password } = req.body;

    if (!email || !password) {
      generateError(`Faltan datos`, 400);
    }

    // - Comprobar que el usuario no exista.
    const [user] = await connection.query(
      `
        SELECT id, created_at
        FROM users
        WHERE email = ? AND password = SHA2(?, 512)
      `,
      [email, password]
    );

    if (user.length === 0) {
      generateError(`Email o password no correctos`, 401);
    }

    const info = {
      id: user[0].id,
    };

    const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.status(201).send({
      status: 'ok',
      message: 'Login',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
