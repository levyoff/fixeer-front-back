'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError } = require('../../helpers');

const getServices = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [services] = await connection.query(
      `
      SELECT  *
      FROM services
      ORDER BY id DESC
    `
    );

    if (services.length < 1) {
      generateError('No existen servicios creados', 500);
    }

    res.status(200).send({
      status: 'ok',
      message: 'Informaciones de servicios',
      data: services,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getServices;
