import express from 'express';
import { registrarIngresoVehiculo } from '../controllers/ingresoVehiculoController';

const router = express.Router();

router.post('/ingresoVehiculo', registrarIngresoVehiculo);

