'use strict';

const getDB = require('../../BBDD/getConnection');
const path = require('path');
const fs = require('fs/promises');

const { generateError } = require('../../helpers');

const downloadFile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { fileName } = req.body;

    if (!fileName) {
      generateError('Faltan campos', 400);
    }

    // Creamos la ruta al archivo que queremos decargar.
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      process.env.UPLOADS_DIRECTORY,
      fileName
    );

    // Comprobamos si el archivo existe.
    try {
      // El metodo access lanza un error si el directorio o archivo no existe.
      await fs.access(filePath);
    } catch {
      // Si el archivo no existe entraramos en el catch y lanzamos un error.
      generateError('Fichero no encontrado', 404);
    }

    // Obtenemos los datos del archivo.
    const file = await fs.readFile(filePath);

    res.status(200).send({
      status: 'ok',
      data: {
        file,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = downloadFile;
