import express from 'express';
import {
  crearRecuperacion,
  verificarCodigo,
  almacenarcodigoRecuperacion
} from '../controladores/RecuperacionCtrl.js';

const router = express.Router();

router.post('/recuperacion/:id_usuario', crearRecuperacion);
router.get('/recuperacion/verificar/:id_usuario/:codigo', verificarCodigo);
export default router;
