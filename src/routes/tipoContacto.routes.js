import express from 'express';
import {
  obtenerTipoContacto,
  obtenerTipoContactoPorId
} from '../controladores/tipoContactoCtrl.js';

const router = express.Router();

router.get('/tipo_contacto', obtenerTipoContacto);
router.get('/tipo_contacto/:id_contacto', obtenerTipoContactoPorId);

export default router;
