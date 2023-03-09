'use strict';

const getDB = require('../BBDD/getConnection');
const { generateError } = require('../helpers');

// - Middleware si el usuario con el token puede editar el servicio como "resuelto"

const canEdit = async (req, res, next) => {
  let connection;
  try {
    // Realizamos la conexion a la base de datos.
    connection = await getDB();

    // Tomamos el "id" que viene poor parametro.
    const { id } = req.params;

    // Realizamos la query para extraer el users_id
    // el cual hace referencia al usuario que creo el servicio
    const [service] = await connection.query(
      `
        SELECT users_id
        FROM services
        WHERE id = ?
      `,
      [id]
    );
    // - Lanzaremos un error si el usuario con token no es el mismo que creo el servicio
    if (service[0].users_id !== req.user.id) {
      generateError('No tienes los permisos para modificar el servicio', 401);
    }
    // En caso de ser el mismo usuario, avanzaremos al siguiente.
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canEdit;
