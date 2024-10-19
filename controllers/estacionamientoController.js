import Estacionamiento from '../models/Estacionamiento.js';
import Usuario from '../models/Usuario.js';
import Espacio from '../models/Espacio.js';

export const crearEstacionamiento = async (req, res) => {
  try {
    const { nombre, direccion, precio_por_minuto, horario_disponible, propietario_id, capacidad } = req.body;

    const propietario = await Usuario.findByPk(propietario_id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }

    const nuevoEstacionamiento = await Estacionamiento.create({
      nombre,
      direccion,
      precio_por_minuto,
      horario_disponible,
      propietario_id,
      capacidad
    });

    const espacios = [];
    for (let i = 1; i <= capacidad; i++) {
      espacios.push({
        estacionamiento_id: nuevoEstacionamiento.estacionamiento_id,
        numero_espacio: i,
        estado: 0
      });
    }

    await Espacio.bulkCreate(espacios);

    res.status(201).json({
      message: 'Estacionamiento y espacios creados exitosamente',
      estacionamiento: nuevoEstacionamiento,
      espaciosCreados: capacidad
    });

  } catch (error) {
    console.error('Error al crear el estacionamiento y los espacios:', error);
    res.status(500).json({ message: 'Error al crear el estacionamiento y los espacios', error: error.message });
  }
};


export const obtenerEstacionamientos = async (req, res) => {
  try {
    const estacionamientos = await Estacionamiento.findAll();
    res.status(200).json(estacionamientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estacionamientos', error: error.message });
  }
};


export const obtenerEstacionamientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const estacionamiento = await Estacionamiento.findByPk(id);
    if (!estacionamiento) {
      return res.status(404).json({ message: 'Estacionamiento no encontrado' });
    }
    res.status(200).json(estacionamiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estacionamiento', error: error.message });
  }
};


export const actualizarEstacionamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, precio_por_minuto, horario_disponible, propietario_id, capacidad } = req.body;
    const estacionamiento = await Estacionamiento.findByPk(id);
    if (!estacionamiento) {
      return res.status(404).json({ message: 'Estacionamiento no encontrado' });
    }

    estacionamiento.nombre = nombre;
    estacionamiento.direccion = direccion;
    estacionamiento.precio_por_minuto = precio_por_minuto;
    estacionamiento.horario_disponible = horario_disponible;
    estacionamiento.propietario_id = propietario_id;
    estacionamiento.capacidad = capacidad;

    await estacionamiento.save();
    res.status(200).json(estacionamiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estacionamiento', error: error.message });
  }
};

export const eliminarEstacionamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const estacionamiento = await Estacionamiento.findByPk(id);
    if (!estacionamiento) {
      return res.status(404).json({ message: 'Estacionamiento no encontrado' });
    }

    await Espacio.destroy({
      where: { estacionamiento_id: id }
    });

    await estacionamiento.destroy();

    res.status(200).json({ message: 'Estacionamiento y sus espacios eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estacionamiento y sus espacios', error: error.message });
  }
};

export const obtenerEstacionamientosPorPropietario = async (req, res) => {
  try {
    const { propietario_id } = req.params;
    const estacionamientos = await Estacionamiento.findAll({
      where: {
        propietario_id
      }
    });

    if (estacionamientos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron estacionamientos para este propietario' });
    }

    res.status(200).json(estacionamientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estacionamientos del propietario', error: error.message });
  }
};
