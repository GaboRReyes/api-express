// src/middlewares/validarUsuario.js
// Valida que el body de la petición tenga los campos obligatorios.
// Se aplica solo a las rutas que lo necesitan (POST, PUT).

function validarUsuario(req, res, next) {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      exito:   false,
      mensaje: 'Los campos "nombre" y "email" son obligatorios',
    });
  }

  // Validación básica de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      exito:   false,
      mensaje: 'El formato del email no es válido',
    });
  }

  next();
}

module.exports = validarUsuario;
