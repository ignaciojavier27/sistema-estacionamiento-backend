import express from 'express';
import {
  crearReserva,
  actualizarEstadoReserva,
  listarReservasUsuario,
  listarReservasPropietario,
  eliminarReserva,
} from '../controllers/reservasController.js';

const router = express.Router();

router.post('/', crearReserva);

router.patch('/:reserva_id', actualizarEstadoReserva);

router.get('/usuario/:usuario_id', listarReservasUsuario);

router.get('/propietario/:propietario_id', listarReservasPropietario);

router.delete('/:reserva_id', eliminarReserva);

export default router;
