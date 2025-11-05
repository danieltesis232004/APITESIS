import express from 'express';
import { enviarCodigoPorCorreo } from '../controladores/emailCtrl.js';

const router = express.Router();

router.post('/enviar', enviarCodigoPorCorreo); 

export default router;