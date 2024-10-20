import express from 'express';
import { obtenerEspacios, obtenerEspacioPorId, obtenerEspaciosPorPropietario } from '../controllers/espacioController.js';

const router = express.Router();

router.get('/espacios', obtenerEspacios);
router.get('/espacios/:id', obtenerEspacioPorId);
router.get('/espacios/propietario/:propietario_id', obtenerEspaciosPorPropietario);

export default router;
