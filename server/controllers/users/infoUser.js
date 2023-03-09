'use strict';
const jwt = require('jsonwebtoken');
const getDB = require('../../BBDD/getConnection');

const infoUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    let { id } = req.params;

    if (req.user) {
        const tokenInfo = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = tokenInfo;
      id = req.user.id;
    }
  
    const [user] = await connection.query(
      `
      SELECT email, created_at, name, username, last_name, bio, img, modified_at
      FROM users
      WHERE id=?
    `,
      [id]
    );

    const [services] = await connection.query(
      `
      SELECT id, title, description, file_name, solved, created_at
      FROM services
      WHERE users_id = ?
    `,
      [id]
    );

    const info = {
      username: user[0].username,
      name: user[0].name,
      last_name: user[0].last_name,
      bio: user[0].bio,
      img: user[0].img,
      created_at: user[0].created_at,
      services: services,
    };

    if (req.user) {
      info.email = user[0].email;
      info.id = id;
      info.modified_at = user[0].modified_at;
    }
    res.status(200).send({
      status: 'ok',
      message: 'Informaciones usuario',
      data: info,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = infoUser;
