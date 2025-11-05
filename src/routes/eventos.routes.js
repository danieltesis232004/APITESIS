import express from 'express';
import {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../controladores/eventosCtrl.js';

const router = express.Router();

router.get('/eventos', obtenerEventos);
router.get('/eventos/:id_eventos', obtenerEventoPorId);
router.post('/eventos', crearEvento);
router.put('/eventos/:id_eventos', actualizarEvento);
router.delete('/eventos/:id_eventos', eliminarEvento);

export default router;
