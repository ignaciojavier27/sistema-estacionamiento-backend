import express from 'express';
import { registrarIngresoVehiculo, obtenerIngresoVehiculos } from '../controllers/ingresoVehiculoController';

const router = express.Router();

router.post('/ingresoVehiculo', registrarIngresoVehiculo);
router.post('/ingresoVehiculo', obtenerIngresoVehiculos);


