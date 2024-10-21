import express from 'express';
import { registrarSalidaVehiculo, obtenerSalidasVehiculos } from '../controllers/salidaVehiculoController';

const router = express.Router();

router.post('/salidaVehiculo', registrarSalidaVehiculo);
router.get('/salidaVehiculo', obtenerSalidasVehiculos);

export default router;