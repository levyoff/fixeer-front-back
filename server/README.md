# Fixeer

- Fixeer consiste en una web de servicios, donde los usuarios pueden publicar diferentes servicios digitales para que otros usuarios les den solución, o solucionar las consultas de otros usuarios.

# Intalación

- Pasos a seguir para la creación de la API:

  1. Instalamos todas las dependencias introduciendo 'npm i' en el terminal.
  2. Creamos en mySQL Workbench una base de datos, y la activamos con 'USE'.
  3. Crearemos un archivo .env con los campos guardados en .env.example, y los rellenaremos con nuestros datos de usuario.
  4. Introducimos en el terminal 'npm run initDB', para crear una conexión con la base de datos y crear las tablas pertinentes.
  5. Inicializamos el servidor con 'npm run dev'

# Entidades

- Users:
  id,
  email,
  password,
  name,
  last_name,
  bio,
  img,
  created_at,
  modified_at

- Services:
  id,
  title,
  description,
  file_name,
  solved,
  users_id,
  created_at,
  modified_at

- Comments:
  id,
  users_id,
  services_id,
  created_at,
  file_name,
  comment

# Endpoints

- Usuarios:

  POST [/users] - Registro de usuario. ✅ ✓
  POST [/users/login] - Login de ususario. ✅ ✓
  GET [/users/:id] - Devuelve información y servicios de un usuario. ✅
  PATCH [/users/:id] - Modifica la información de un usuario. ✅

- Services:

  POST [/services] - Permite crear un servicio (necesita token). ✅ ✓
  GET [/services] - Lista de todos los servicios y comentarios. ✅ ✓
  GET [/services/:id] - Devuelve un servicio concreto y comentarios. ✅ ✓
  PATCH [/services/:id] - Actualizar el estado del servicio (necesita token). ✅

- Comments:

POST [/services/:id/comments] - Hacer un comentario de un servicio (necesita token) ✅ ✓
