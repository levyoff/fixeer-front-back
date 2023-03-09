'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError } = require('../../helpers');

/*
 **** El usuario podra modificar:
 ****  Email, nombre, apellido, biografia y avatar.
 ****
 */
const updateUser = async (req, res, next) => {
  let connection;

  try {
    // Realizamos la conexion a la base de datos.
    connection = await getDB();

    // Tomamos el "id" que viene por parametro.
    // en este caso es el usuario.
    const { id } = req.params;

    // Destructuring de los datos mediante el body
    // Estos datos seran los nuevos.
    const { name, last_name, email, bio } = req.body;


    // Comprobamos que el usuario pasado por parametros sea el mismo que
    // el del token.
    if (req.user.id !== Number(id)) {
      generateError('No tienes permisos para editar el usuario.', 403);
    }

    // Buscamos el usuario en la base de datos.
    const [user] = await connection.query(
      `
        SELECT *
        FROM users
        WHERE id = ?
        `,
      [req.user.id]
    );

    // Comprobamos qué campos deben actualizarse
    const updateFields = {};
    if (name) 
      updateFields.name = name;
    if (last_name) 
      updateFields.last_name = last_name;
    if (email && email !== user[0].email) {
      // Si el usuario desea modificar su email, debemos comprobar que no existe
      // en la base de datos.
      const [newEmail] = await connection.query(
        `
              SELECT id
              FROM users
              WHERE email=?               
              `,
        [email]
      );

      // Si existe el email proporcionado por el usuario, no podemos modificarlo.
      if (newEmail.length > 0) {
        generateError('Ya existe un usuario con ese email.', 403);
      }

      updateFields.email = email;
    }
    if (bio) 
      updateFields.bio = bio;

    // Realizamos el update de los datos del usuario.
    if (Object.keys(updateFields).length > 0) {
      await connection.query(
        `
        UPDATE users
        SET ${Object.keys(updateFields)
          .map((key) => `${key} = ?`)
          .join(', ')}, modified_at = ?
        WHERE id = ?
      `,
        [...Object.values(updateFields), new Date(), req.user.id]
      );
    }

    res.status(200).send({
      status: 'ok',
      message: 'Usuario modificado',
    });
      } catch (error) {
        next(error);
      } finally {
        if (connection) connection.release();
      }
    };

module.exports = updateUser;
