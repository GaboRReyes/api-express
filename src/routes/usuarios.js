// src/routes/usuarios.js
// Define únicamente los endpoints y qué middleware/controlador les corresponde.
// Toda la lógica vive en el controlador.

const express        = require('express');
const router         = express.Router();
const validarUsuario = require('../middlewares/validarUsuario');
const ctrl           = require('../controllers/usuariosController');

// GET  /usuarios          → listar (con filtros y paginación)
// GET  /usuarios/:id      → obtener uno
// POST /usuarios          → crear (valida body primero)
// PUT  /usuarios/:id      → actualizar (valida body primero)
// DELETE /usuarios/:id    → eliminar

router.get('/',     ctrl.listarUsuarios);
router.get('/:id',  ctrl.obtenerUsuario);
router.post('/',    validarUsuario, ctrl.crearUsuario);
router.put('/:id',  validarUsuario, ctrl.actualizarUsuario);
router.delete('/:id', ctrl.eliminarUsuario);

module.exports = router;
