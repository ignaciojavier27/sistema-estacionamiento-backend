import express from 'express';
import {
    crearNotificacionUsuario,
    crearNotificacionPropietario,
    obtenerNotificacionesUsuario,
    obtenerNotificacionesPropietario,
    marcarNotificacionLeida,
    eliminarNotificacionPropietario,
    eliminarNotificacionUsuario,
} from '../controllers/notificacionesController.js';

const router = express.Router();

router.post('/notificacion/usuarios', crearNotificacionUsuario);
router.get('/notificacion/usuarios/:usuario_id', obtenerNotificacionesUsuario);
router.delete('/notificacion/usuarios/:notificacion_id', eliminarNotificacionUsuario);


router.post('/notificacion/propietarios', crearNotificacionPropietario);
router.get('/notificacion/propietarios/:propietario_id', obtenerNotificacionesPropietario);
router.delete('/notificacion/propietarios/:notificacion_id', eliminarNotificacionPropietario);


router.patch('/notificacion/:tipo/:id', marcarNotificacionLeida);

export default router;