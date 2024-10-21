import SalidaVehiculo from '../models/SalidaVehiculo.js';
import IngresoVehiculo from '../models/IngresoVehiculo.js';
import Espacio from '../models/Espacio.js';
import Estacionamiento from '../models/Estacionamiento.js';

export const registrarSalidaVehiculo = async (req, res) => {
  try {
    const { ingreso_id } = req.body;

    const ingreso = await IngresoVehiculo.findByPk(ingreso_id);
    if (!ingreso) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }

    const espacioUsado = await Espacio.findByPk(ingreso.espacio_id);
    const estacionamiento = await Estacionamiento.findByPk(espacioUsado.estacionamiento_id);

    const horaIngreso = new Date(ingreso.hora_ingreso);
    const horaSalida = new Date();
    const tiempoEstacionado = (horaSalida - horaIngreso) / (1000 * 60 * 60);

    const tarifaPorHora = estacionamiento.precio_por_minuto;
    const totalAPagar = Math.max(tiempoEstacionado * tarifaPorHora, 0).toFixed(2);

    const recibo = `Patente: ${ingreso.patente}\nIngreso: ${horaIngreso.toLocaleString()}\nSalida: ${horaSalida.toLocaleString()}\nTotal a Pagar: $${totalAPagar}`;

    const salida = await SalidaVehiculo.create({
      ingreso_id: ingreso.ingreso_id,
      hora_salida: horaSalida,
      total_a_pagar: totalAPagar,
      recibo: recibo,
    });

    const espacio = await Espacio.findByPk(ingreso.espacio_id);
    if (espacio) {
      espacio.estado = 0;
      await espacio.save();
    }

    res.status(200).json({ message: 'Salida registrada correctamente', salida });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la salida', error: error.message });
  }
};

export const obtenerSalidasVehiculos = async (req, res) => {
  try {
    const salidas = await SalidaVehiculo.findAll({
      include: {
        model: IngresoVehiculo,
        attributes: ['patente', 'hora_ingreso'],
      },
    });
    res.status(200).json(salidas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las salidas', error: error.message });
  }
};
