'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError } = require('../../helpers');

const getServicesById = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [services] = await connection.query(
      `
      SELECT *
      FROM services
      WHERE id = ?
    `,
      [id]
    );

    if (services.length < 1) {
      generateError('No existen este servicio concreto', 500);
    }

    const infoService = {
      title: services[0].title,
      description: services[0].description,
      file_name: services[0].file_name,
      solved: services[0].solved,
      created_at: services[0].created_at,
      modified_at: services[0].modified_at,
      users_id: services[0].users_id,
      username: services[0].username,
      img: services[0].img,
    };

    const [comments] = await connection.query(
      `
      SELECT id, comment, users_id, file_name, created_at, username
      FROM comments
      WHERE services_id = ?
      ORDER BY created_at DESC
      `,
      [id]
    );

    infoService.comments = comments;
    res.status(200).send({
      status: 'ok',
      message: 'Información de un servicio concreto',
      data: infoService,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getServicesById;
