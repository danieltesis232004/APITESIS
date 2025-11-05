import express from 'express';
import {
  obtenerRecorridos,
  obtenerRecorridoPorId,
  crearRecorrido,
  actualizarRecorrido,
  eliminarRecorrido
} from '../controladores/recorridoCtrl.js';

const router = express.Router();

router.get('/recorrido', obtenerRecorridos);
router.get('/recorrido/:id_recorrido', obtenerRecorridoPorId);
router.post('/recorrido', crearRecorrido);
router.put('/recorrido/:id_recorrido', actualizarRecorrido);
router.delete('/recorrido/:id_recorrido', eliminarRecorrido);

export default router;
