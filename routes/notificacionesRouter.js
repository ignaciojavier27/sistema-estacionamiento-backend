import express from 'express';
import {
    crearNotificacionUsuario,
    crearNotificacionPropietario,
    obtenerNotificacionesUsuario,
    obtenerNotificacionesPropietario,
    marcarNotificacionLeida,
} from '../controllers/notificacionesController.js';

const router = express.Router();

router.post('/notificacion/usuarios', crearNotificacionUsuario);
router.get('/notificacion/usuarios/:usuario_id', obtenerNotificacionesUsuario);

router.post('/notificacion/propietarios', crearNotificacionPropietario);
router.get('/notificacion/propietarios/:propietario_id', obtenerNotificacionesPropietario);

router.patch('/notificacion/:tipo/:id', marcarNotificacionLeida);

export default router;