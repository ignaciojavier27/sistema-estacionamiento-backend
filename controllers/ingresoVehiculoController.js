import Espacio from '../models/Espacio.js';
import IngresoVehiculo from '../models/IngresoVehiculo.js';
export const registrarIngresoVehiculo = async (req, res) => {
  try {
      const { espacio_id, patente } = req.body;
      
      const espacio = await Espacio.findByPk(espacio_id);
      if (!espacio) {
          return res.status(404).json({ message: 'Espacio no encontrado' });
      }
      if (espacio.estado === 1) {
          return res.status(400).json({ message: 'Espacio ya está ocupado' });
      }

      // Crear el ingreso del vehículo
      const ingreso = await IngresoVehiculo.create({ patente, espacio_id });

      espacio.estado = 1;
      espacio.ingreso_id = ingreso.ingreso_id;
      espacio.patente = patente;
      await espacio.save();
      
      res.status(200).json({ message: 'Vehículo ingresado correctamente', ingreso });
  } catch (error) {
      res.status(500).json({ message: 'Error al registrar el ingreso', error: error.message });
  }
};

export const obtenerIngresoVehiculos = async (req, res) => {
    try {
      const ingresos = await IngresoVehiculo.findAll();
      res.status(200).json(ingresos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los ingresos', error: error.message });
    }
};