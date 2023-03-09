'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError, saveFile } = require('../../helpers');
const path = require('path');

const createService = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { title, description } = req.body;

    if (!title || !description || !req.files?.file) {
      generateError('Faltan campos', 400);
    }

    // - Guardamos la imagen en la carpeta "uploads" y obtenemos el nombre de la misma.
    const fileName = await saveFile(req.files.file);

    // - Guardamos el service en la BBDD.

    const [user] = await connection.query(
      `
      SELECT username, img
      FROM users
      WHERE id=?
    `,
      [req.user.id]
    );

    const [existingUser] = await connection.query(
      `
      INSERT INTO services (title, description, file_name, users_id, username, img)
      VALUES (?, ?, ?, ?, ?, ?)
  `,
      [title, description, fileName, req.user.id, user[0].username, user[0].img]
    );


    res.send({
      status: 'ok',
      message: 'Servicio creado',
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createService;
