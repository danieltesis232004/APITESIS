import express from 'express';
import { enviarCodigoPorCorreo } from '../Controladores/emailCtrl.js';

const router = express.Router();

router.post('/enviar/:correoDestino/:codigo', enviarCodigoPorCorreo);

export default router;