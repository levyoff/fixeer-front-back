'use strict';

const getDB = require('../../BBDD/getConnection');
const { generateError, savePhoto } = require('../../helpers');
const path = require('path');
const { v4: uuid } = require('uuid');

const validExtensions = ['.gif', '.jpeg', '.jpg', '.png', '.webp'];
const userUpdateAvatar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    console.log(req.body);
    if (!req.files?.avatar || !req.files) {
      generateError('No hay imagen', 500);
    }
    const profileImage = req.files.avatar;
    const extension = path.extname(profileImage.name).toLowerCase();
    console.log(extension);
    if (!validExtensions.includes(extension)) {
      generateError('Error de extension', 500);
    }

    const avatarUser = await savePhoto(req.files.avatar, extension);
    await connection.query(
      `
            UPDATE users
            SET img = ?
            WHERE id = ?
        `,
      [avatarUser, req.user.id]
    );

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

module.exports = userUpdateAvatar;
