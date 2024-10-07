import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', crearUsuario);
router.get('/usuarios', obtenerUsuarios); 
router.get('/usuarios/:id', obtenerUsuarioPorId); 
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

export default router;
