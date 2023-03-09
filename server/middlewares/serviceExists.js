'use strict';

const getDB = require('../BBDD/getConnection');
const { generateError } = require('../helpers');

// Middleware que comprueba que el Servicio pasado por parametros existe.

const serviceExists = async (req, res, next) => {
  let connection;

  try {
    // Conexión con la base de Datos.
    connection = await getDB();

    // Tomamos el "id" que viene poor parametro.
    const { id } = req.params;

    // Realizamos la query para verificar si existe ese usuario.
    const [service] = await connection.query(
      `
        SELECT id
        FROM services
        WHERE id=?
      `,
      [id]
    );

    //En el caso de no encontrar ese usuario.
    if (service.length === 0) {
      generateError('Servicio no encontrado.', 400);
    }

    //Pasamos al siguiente paso.
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = serviceExists;
