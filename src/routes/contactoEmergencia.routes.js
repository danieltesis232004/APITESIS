import express from 'express';
import {
  obtenerContactoEmergenciaPorId,
  obtenerContactosPorUsuario,
  crearContactoEmergencia,
  actualizarContactoEmergencia,
  eliminarContactoEmergencia
} from '../controladores/contactoEmergenciaCtrl.js';

const router = express.Router();


router.get('/contacto_emergencia/:id_contacto_emergencia', obtenerContactoEmergenciaPorId);
router.get('/contacto_emergencia/usuario/:id_usuario', obtenerContactosPorUsuario);
router.post('/contacto_emergencia', crearContactoEmergencia);
router.put('/contacto_emergencia/:id_contacto_emergencia', actualizarContactoEmergencia);
router.delete('/contacto_emergencia/:id_contacto_emergencia', eliminarContactoEmergencia);

export default router;
