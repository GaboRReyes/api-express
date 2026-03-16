// src/middlewares/errorHandler.js
// Middleware de manejo de errores global.
// Express lo identifica como error handler porque recibe 4 parámetros (err, req, res, next).
// Debe registrarse DESPUÉS de todas las rutas en server.js.

function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);

  const status = err.status || 500;

  res.status(status).json({
    exito:   false,
    mensaje: err.message || 'Error interno del servidor',
  });
}

module.exports = errorHandler;
