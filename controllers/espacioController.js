import Espacio from '../models/Espacio.js';
import Estacionamiento from '../models/Estacionamiento.js';
import IngresoVehiculo from '../models/IngresoVehiculo.js';

// Obtener todos los espacios
export const obtenerEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.findAll();
    res.status(200).json(espacios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los espacios', error: error.message });
  }
};

// Obtener un espacio por ID
export const obtenerEspacioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const espacio = await Espacio.findByPk(id, {
      include: [{
        model: IngresoVehiculo,
        attributes: ['ingreso_id', 'patente'],
      }]
    }); 

    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.status(200).json(espacio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el espacio', error: error.message });
  }
};

// Obtener espacios por propietario
export const obtenerEspaciosPorPropietario = async (req, res) => {
  try {
    const { propietario_id } = req.params;

    const estacionamientos = await Estacionamiento.findAll({where: { propietario_id }});

    if (estacionamientos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron estacionamientos para este propietario' });
    }

    const espacios = estacionamientos.flatMap(est => est.Espacios);

    res.status(200).json(espacios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los espacios del propietario', error: error.message });
  }
};

// Obtener espacios por estacionamiento
export const obtenerEspaciosPorEstacionamiento = async (req, res) => {
  try {
    const { estacionamiento_id } = req.params;
    const espacios = await Espacio.findAll({where: { estacionamiento_id }});

    if (espacios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron espacios para este estacionamiento' });
    }

    res.status(200).json(espacios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los espacios', error: error.message });
  }
};
