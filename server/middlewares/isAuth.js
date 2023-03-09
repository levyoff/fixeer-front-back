const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const isAuth = async (req, res, next) => {
  try {
    // - Extraemos authorization de los headers de request.

    const { authorization } = req.headers;

    // - Si falta autorización generamos un error.

    if (!authorization) {
      throw generateError('Falta la cabecera de autenticación', 400);
    }

    // - Declaramos tokenInfo donde guardaremos la información del token verificado
    //mediante el método verify de jwt.

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch {
      generateError('Token incorrecto', 401);
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
