'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError, saveFile } = require('../../helpers');
const path = require('path');

const createComment = async (req, res, next) => {
  // - Abrimos la conexión.
  let connection;

  try {
    // - Conectamos con la BBDD.
    connection = await getDB();

    // - Extreamos 'id' y 'comment' de 'path-params' y el 'body' respectivamente.
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      // - El comentario debe ser obligatorio de lo contrario generamos un error.
      generateError('Faltan campo comentario', 400);
    }

    let newComment;
    let fileName;
    const [user] = await connection.query(
      `
      SELECT username
      FROM users
      WHERE id = ?
      `,
      [req.user.id]
    );

    if (req.files?.file) {
      // - Guardamos el archivo  en la carpeta "uploads" en caso de existir y obtenemos el nombre de la misma.
      fileName = await saveFile(req.files.file);

      // - Generamos la query a insertar en el BBDD en el caso de que exista un archivo a parte del comentario.
      [newComment] = await connection.query(
        `
        INSERT INTO comments (comment, users_id, services_id, file_name, username)
        VALUES (?, ?, ?, ?, ?)
    `,
        [comment, req.user.id, id, fileName, user[0].username]
      );
    } else {
      // - En el caso de que no exista un archivo generamos la query del 'comment' en el BBD.
      [newComment] = await connection.query(
        `
            INSERT INTO comments (comment, users_id, services_id, username)
            VALUES (?, ?, ?, ?)
        `,
        [comment, req.user.id, id, user[0].username]
      );
    }

    // - Guardamos el 'comment' en la BBDD con el objeto res.
    res.send({
      status: 'ok',
      data: {
        comment: {
          id: newComment.insertId,
          comment,
          user_id: req.user.id,
          file_name: fileName,
          username: user[0].username,
        },
      },
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createComment;
