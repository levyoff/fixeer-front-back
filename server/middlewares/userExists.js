'use strict';

const getDB = require('../BBDD/getConnection');
const { generateError } = require('../helpers');

//Middleware que comprueba que el usuario pasado por path param exista

const userExists = async (req, res, next) => {
  let connection;
  try {
    // Conexión con la base de Datos.
    connection = await getDB();

    // Tomamos el "id" que viene poor parametro.
    const { id } = req.params;

    // Realizamos la query para verificar si existe ese usuario.
    const [user] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE id=?
      `,
      [id]
    );

    //En el caso de no encontrar el usuario, lanzamos un error
    if (user.length === 0) {
      generateError('Usuario no encontrado', 404);
    }
    // Avanzamos al siguiente.
    next();
  } catch (error) {
    next(error);
  } finally {
    console.log('liberamos conexión en userExists')
    if (connection) connection.release();
  }
};

module.exports = userExists;
