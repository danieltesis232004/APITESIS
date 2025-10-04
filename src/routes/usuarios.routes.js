import express from 'express';
import {obetenerdatosA,obetenerdatos,postUsuarios } from '../controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuariosA/:correo_electronico/:contrasena', obetenerdatosA);
router.get('/usuarios',obetenerdatos)
router.post('/usuariosG/',postUsuarios)

export default router;
