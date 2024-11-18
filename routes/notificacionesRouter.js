import express from 'express';
import {
    crearNotificacionUsuario,
    crearNotificacionPropietario,
    obtenerNotificacionesUsuario,
    obtenerNotificacionesPropietario,
    marcarNotificacionLeida,
} from '../controllers/notificacionesController.js';

const router = express.Router();

router.post('/usuarios', crearNotificacionUsuario);
router.get('/usuarios/:usuario_id', obtenerNotificacionesUsuario);

router.post('/propietarios', crearNotificacionPropietario);
router.get('/propietarios/:propietario_id', obtenerNotificacionesPropietario);

router.patch('/:tipo/:id', marcarNotificacionLeida);

export default router;