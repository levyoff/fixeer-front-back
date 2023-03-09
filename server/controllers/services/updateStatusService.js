'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError } = require('../../helpers');

const updateStatusService = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Tomamos el "id" que viene poor parametro.
    const { id } = req.params;

    let solvedStatus = await connection.query(
      `
      SELECT solved
      FROM services 
      WHERE id=?
      `,
      [id]
    );

    let value = solvedStatus[0][0].solved;

    if (value === 0) {
      value = 1;
    } else {
      value = 0;
    }

    // Modificamos el campo de solved del servicio en concreto.
    await connection.query(
      `
          UPDATE services
          SET solved = ?
          WHERE id = ?
      `,
      [value, id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Servicio modificado',
      data: value,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateStatusService;
