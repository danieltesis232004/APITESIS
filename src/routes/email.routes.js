import express from 'express';
import { enviarCodigoPorCorreo } from '../controladores/emailCtrl.js';

const router = express.Router();

router.post('/enviar/:correoDestino/:codigo', enviarCodigoPorCorreo);

export default router;