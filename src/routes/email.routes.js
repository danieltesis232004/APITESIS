import express from 'express';
import { enviarCodigoPorCorreo, enviarAlertaSomnolencia } from '../controladores/emailCtrl.js';

const router = express.Router();

router.post('/enviar', enviarCodigoPorCorreo); 
router.post('/alerta-somnolencia', enviarAlertaSomnolencia);

export default router;