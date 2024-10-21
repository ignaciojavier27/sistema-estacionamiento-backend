import express from 'express';
import { registrarIngresoVehiculo, obtenerIngresoVehiculos } from '../controllers/ingresoVehiculoController.js';

const router = express.Router();

router.post('/ingresoVehiculo', registrarIngresoVehiculo);
router.get('/ingresoVehiculo', obtenerIngresoVehiculos);

export default router;


