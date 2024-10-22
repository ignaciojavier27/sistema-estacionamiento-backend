import express from 'express';
import { registrarSalidaVehiculo, obtenerSalidasVehiculos, obtenerSalidasVehiculosPorEstacionamiento } from '../controllers/salidaVehiculoController.js';

const router = express.Router();

router.post('/salidaVehiculo', registrarSalidaVehiculo);
router.get('/salidaVehiculo', obtenerSalidasVehiculos);
router.get('/salidaVehiculo/estacionamiento/:estacionamiento_id', obtenerSalidasVehiculosPorEstacionamiento);

export default router;