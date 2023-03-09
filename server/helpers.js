'use strict';
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const generateError = (message, code = 500) => {
  const error = new Error(message);
  error.httpStatus = code;
  throw error;
};

const savePhoto = async (avatar, extension) => {
  // Creamos la ruta absoluta al directorio de subida de archivos.
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIRECTORY);

  try {
    // Comprobamos si existe el directorio de subida de archivos.
    await fs.access(uploadsPath);
  } catch {
    // Si el directorio no existe el método "access" lanza un error por
    // lo que entramos en el catch. Creamos el directorio.
    await fs.mkdir(uploadsPath);
  }
  // creo la imagen con sharp a partir del buffer
  const img = sharp(avatar.data);

  // genero un nombre unico para la image
  const photoNameUniq = `${uuid()}${extension}`;

  // Generamos la ruta absoluta a al archivo.
  const rutaAbsoluta = path.join(
    __dirname,
    process.env.UPLOADS_DIRECTORY,
    photoNameUniq
  );

  // guardo la imagen en el directorio de los ficheros estaticos
  await img.toFile(rutaAbsoluta);

  return photoNameUniq;
};

const saveFile = async (file) => {
  // Creamos la ruta absoluta al directorio de subida de archivos.
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIRECTORY);

  try {
    // Comprobamos si existe el directorio de subida de archivos.
    await fs.access(uploadsPath);
  } catch {
    // Si el directorio no existe el método "access" lanza un error por
    // lo que entramos en el catch. Creamos el directorio.
    await fs.mkdir(uploadsPath);
  }

  const extension = path.extname(file.name);

  // Generamos un nombre único para el archivo imagen.
  const randomName = `${uuid()}${extension}`;

  // Generamos la ruta absoluta a al archivo.
  const rutaAbsoluta = path.join(
    __dirname,
    process.env.UPLOADS_DIRECTORY,
    randomName
  );

  // Guardamos el archivo en el directorio de "uploads".

  // await randomName.toFile(file);
  await file.mv(rutaAbsoluta);

  // Retornamos el nombre con el que hemos guardado la imagen.
  return randomName;
};

module.exports = { generateError, saveFile, savePhoto };
