const usuarios = require('../data/usuarios');

// ─── GET /usuarios ────────────────────────────────────────────────────────────
// Soporta:
//   ?edadMin=25          → filtra por edad mínima
//   ?nombre=ana          → búsqueda parcial, insensible a mayúsculas
//   ?pagina=1&limite=2   → paginación (Reto 4)

const listarUsuarios = (req, res) => {
  let resultado = [...usuarios];

  // Filtro por edad mínima
  if (req.query.edadMin) {
    const edadMin = parseInt(req.query.edadMin);
    if (isNaN(edadMin)) {
      return res.status(400).json({ exito: false, mensaje: '"edadMin" debe ser un número' });
    }
    resultado = resultado.filter(u => u.edad >= edadMin);
  }

  // Búsqueda parcial por nombre (insensible a mayúsculas)
  if (req.query.nombre) {
    const termino = req.query.nombre.toLowerCase();
    resultado = resultado.filter(u => u.nombre.toLowerCase().includes(termino));
  }

  const pagina = parseInt(req.query.pagina) || 1;   // default: página 1
  const limite = parseInt(req.query.limite) || resultado.length; // default: todo

  if (pagina < 1 || limite < 1) {
    return res.status(400).json({ exito: false, mensaje: '"pagina" y "limite" deben ser mayores a 0' });
  }

  const totalItems  = resultado.length;
  const totalPaginas = Math.ceil(totalItems / limite);
  const inicio      = (pagina - 1) * limite;
  const fin         = inicio + limite;
  const paginado    = resultado.slice(inicio, fin);
  // ────────────────────────────────────────────────────────────────────────

  res.json({
    exito: true,
    total: totalItems,
    paginacion: {
      pagina,
      limite,
      totalPaginas,
      tieneSiguiente: pagina < totalPaginas,
      tieneAnterior:  pagina > 1,
    },
    datos: paginado,
  });
};

// ─── GET /usuarios/:id ────────────────────────────────────────────────────────
const obtenerUsuario = (req, res) => {
  const id      = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
  }

  res.json({ exito: true, datos: usuario });
};

// ─── POST /usuarios ───────────────────────────────────────────────────────────
const crearUsuario = (req, res) => {
  const { nombre, email, edad } = req.body;

  // Verifica que el email no esté ya registrado
  const emailExiste = usuarios.some(u => u.email === email);
  if (emailExiste) {
    return res.status(409).json({ exito: false, mensaje: 'El email ya está registrado' });
  }

  const nuevoUsuario = {
    id:     Date.now(),
    nombre,
    email,
    edad: edad !== undefined ? parseInt(edad) : null,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    exito:   true,
    mensaje: 'Usuario creado exitosamente',
    datos:   nuevoUsuario,
  });
};

// ─── PUT /usuarios/:id ────────────────────────────────────────────────────────
const actualizarUsuario = (req, res) => {
  const id    = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
  }

  // Evita que se sobreescriba el id desde el body
  const { id: _ignorado, ...cambios } = req.body;

  usuarios[index] = { ...usuarios[index], ...cambios };

  res.json({
    exito:   true,
    mensaje: 'Usuario actualizado correctamente',
    datos:   usuarios[index],
  });
};

// ─── DELETE /usuarios/:id ─────────────────────────────────────────────────────
const eliminarUsuario = (req, res) => {
  const id    = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
  }

  usuarios.splice(index, 1);

  res.json({ exito: true, mensaje: 'Usuario eliminado correctamente' });
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
