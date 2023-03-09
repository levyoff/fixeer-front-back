'use strict';

// - Importamos dotenv para acceder a las variables de entorno definidas en .env
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { PORT, UPLOADS_DIRECTORY } = process.env;
const cors = require('cors');
const path = require('path');

// - Creamos una instancia de express.
const app = express();

// - Parseamos el archivo json.
app.use(express.json());

// - Middleware de los recursos estáticos.
const staticDirPath = path.join(__dirname, UPLOADS_DIRECTORY);
app.use(express.static(staticDirPath));

// - Middleware para aceptar futuras peticiones desde el 'Front'.
app.use(cors());

// - Middleware que deserializa un body en formato 'form-data' creando la propiedad
// 'files' en el objeto 'request'.
app.use(fileUpload());

// - Middleware que hace  un log de las peticiones que llegan al servidor.
app.use(morgan('dev'));

// - Importamos controladores de los usuarios.
const {
  createUser,
  loginUser,
  infoUser,
  updateUser,
  userUpdateAvatar,
} = require('./controllers/users/index');

// - Importamos controladores de servicios.

const {
  createService,
  getServices,
  getServiceById,
  updateStatusService,
  downloadFile,
} = require('./controllers/services/index');

// - Importamos controladores de comentarios

const { createComment } = require('./controllers/comments/index');

// - Importamos los middlewares.

const serviceExists = require('./middlewares/serviceExists');
const userExists = require('./middlewares/userExists');
const isAuth = require('./middlewares/isAuth');
const canEdit = require('./middlewares/canEdit');

/*
 ****
 **** End-points USERS
 ****
 */

// - Registro de usuario.
app.post('/users', createUser);
// - Login de ususario y devolverá el TOKEN del mismo.
app.post('/users/login', loginUser);
// - Devuelve información de un usuario (necesita token).
app.get('/users/:id', userExists, infoUser);
// - Devuelve información del usuario que esta con el token.
app.get('/user', isAuth, infoUser);

// - Edita la información del usuario.
app.patch('/user/:id', userExists, isAuth, updateUser);
// - Subimos foto de usuario.
app.patch('/users/avatar/:id', userExists, isAuth, userUpdateAvatar);

/*
 ****
 **** End-points SERVICES
 ****
 */

// - Permite crear un servicio (necesita token).
app.post('/services', isAuth, createService);
// - Lista de todos los servicios y comentarios.
app.get('/services', getServices);
// - Devuelve un servicio concreto y comentarios.
app.get('/services/:id', serviceExists, getServiceById);
// - Actualizar el estado del servicio (necesita token).
app.patch('/services/:id', serviceExists, isAuth, canEdit, updateStatusService);
// - Descargar un archivo.
app.post('/services/:id/files', serviceExists, isAuth, downloadFile);

/*
 ****
 **** End-points COMMENTS
 ****
 */

// - Hacer un comentario de un servicio (necesita token)
app.post('/services/:id/comments', isAuth, createComment);

// - Middleware de los errores.

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// - Middleware de ruta no encontrada.

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// - Ponemos en escucha el servidor.

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
