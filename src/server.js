const express      = require('express');
const logger       = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');
const usuariosRouter = require('./routes/usuarios.js');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares globales
app.use(express.json());   // Parsea el body como JSON
app.use(logger);           // Registra cada petición en consola

// ── Rutas 
app.get('/', (req, res) => {
  res.json({
    mensaje:   'API REST funcionando correctamente',
    version:   '1.0.0',
    endpoints: {
      usuarios: '/usuarios',
    },
  });
});

app.use('/usuarios', usuariosRouter);

// Ruta no encontrada (404 genérico)
app.use((req, res) => {
  res.status(404).json({ exito: false, mensaje: `Ruta "${req.url}" no encontrada` });
});

// ── Manejo de errores global (siempre al final) 
app.use(errorHandler);

// ── Arrancar servidor 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
