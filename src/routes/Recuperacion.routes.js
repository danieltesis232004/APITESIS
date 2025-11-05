import express from 'express';
import {
  crearRecuperacion,
  verificarCodigo,
  obtenerUltimoCodigo
} from '../controladores/RecuperacionCtrl.js';

const router = express.Router();

router.post('/recuperacion/:id_usuario', crearRecuperacion);
router.get('/recuperacion/verificar/:id_usuario/:codigo', verificarCodigo);
router.get('/recuperacion/ultimo/:id_usuario', obtenerUltimoCodigo);

export default router;
