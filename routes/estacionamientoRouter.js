import express from 'express';
import { crearEstacionamiento, obtenerEstacionamientos, obtenerEstacionamientoPorId, actualizarEstacionamiento, eliminarEstacionamiento, obtenerEstacionamientosPorPropietario} from '../controllers/estacionamientoController.js';

const router = express.Router();

router.post('/estacionamientos', crearEstacionamiento);
router.get('/estacionamientos', obtenerEstacionamientos);
router.get('/estacionamientos/:id', obtenerEstacionamientoPorId);
router.put('/estacionamientos/:id', actualizarEstacionamiento);
router.delete('/estacionamientos/:id', eliminarEstacionamiento);
router.get('/estacionamientos/propietario/:propietario_id', obtenerEstacionamientosPorPropietario);

export default router;
