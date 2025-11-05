import express from 'express';
import {
  obtenerTiposDeEventos,
  obtenerTipoDeEventoPorId
} from '../controladores/tipoEventoCtrl.js';

const router = express.Router();

router.get('/tipo_de_eventos', obtenerTiposDeEventos);
router.get('/tipo_de_eventos/:id_tipo', obtenerTipoDeEventoPorId);

export default router;
