// src/middlewares/logger.js
// Registra en consola cada petición que llega al servidor.

function logger(req, res, next) {
  const ahora = new Date().toISOString();
  console.log(`[${ahora}] ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
