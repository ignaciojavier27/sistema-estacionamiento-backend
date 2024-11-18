import express from 'express';
import {
  crearReserva,
  actualizarEstadoReserva,
  listarReservasUsuario,
  listarReservasPropietario,
  eliminarReserva,
} from '../controllers/reservasController.js';

const router = express.Router();

router.post('/reserva', crearReserva);

router.patch('/:reserva_id', actualizarEstadoReserva);

router.get('/reserva/propietario/:usuario_id', listarReservasUsuario);

router.get('/reserva/propietario/:propietario_id', listarReservasPropietario);

router.delete('/reserva/:reserva_id', eliminarReserva);

export default router;
