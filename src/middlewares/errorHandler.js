// src/middlewares/errorHandler.js
// Middleware de manejo de errores global.
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
