import express from 'express';
import { obtenerEspacios, obtenerEspacioPorId, obtenerEspaciosPorPropietario, obtenerEspaciosPorEstacionamiento } from '../controllers/espacioController.js';

const router = express.Router();

router.get('/espacios', obtenerEspacios);
router.get('/espacios/:id', obtenerEspacioPorId);
router.get('/espacios/propietario/:propietario_id', obtenerEspaciosPorPropietario);
router.get('/espacios/estacionamiento/:estacionamiento_id', obtenerEspaciosPorEstacionamiento);


export default router;
