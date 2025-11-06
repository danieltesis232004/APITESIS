import express from 'express';
import {
  obetenerdatos,
  crearUsuario,
  actualizarUsuario,
  verificarCorreo,
  actualizarContrasena,
  obtenerUsuarioPorId,
  loginUsuario,
  obtenerUsuarioPorCorreo   
} from '../controladores/usuariosCtrl.js';

const router = express.Router();
router.get('/login/:correo_electronico/:contrasena', loginUsuario);
router.get('/usuarios',obetenerdatos)
router.post('/usuarios', crearUsuario);    
router.get('/usuarios/:id_usuario', obtenerUsuarioPorId);
router.put('/usuarios/:id_usuario', actualizarUsuario);
router.get('/verificar/:correo_electronico', verificarCorreo);
router.put('/usuarios/contrasena/:id_usuario/:contrasena', actualizarContrasena);
router.get('/usuarios/correo/:correo_electronico', obtenerUsuarioPorCorreo);

export default router;
