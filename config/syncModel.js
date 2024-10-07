import { sequelize } from './database.js';
import Usuario from '../models/Usuario.js';
import Estacionamiento from '../models/Estacionamiento.js';
import Espacio from '../models/Espacio.js';
import Reserva from '../models/Reserva.js';
import Pago from '../models/Pago.js';
import Reporte from '../models/Reporte.js';
import Notificacion from '../models/Notificacion.js';

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos: ', error);
  }
};

