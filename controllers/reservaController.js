import Reserva from '../models/Reserva.js';
import Espacio from '../models/Espacio.js';
import { crearNotificacionPropietario } from './notificacionesController.js';

export const crearReserva = async (req, res) => {
  try {
    const { usuario_id, espacio_id, fecha_reserva, hora_inicio, propietario_id } = req.body;

    // Validar que el espacio está disponible
    const espacio = await Espacio.findByPk(espacio_id);
    if (!espacio || espacio.estado !== 0) {
      return res.status(400).json({ success: false, message: 'El espacio no está disponible.' });
    }

    // Crear reserva
    const nuevaReserva = await Reserva.create({
      usuario_id,
      espacio_id,
      fecha_reserva,
      hora_inicio,
      propietario_id,
    });

    // Generar notificación para el propietario
    await crearNotificacionPropietario({
      body: {
        propietario_id,
        mensaje: `Nueva reserva recibida para el día ${fecha_reserva}.`,
        tipo_notificacion: 'nueva_reserva',
      },
    });

    res.status(201).json({ success: true, data: nuevaReserva });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const actualizarEstadoReserva = async (req, res) => {
    try {
      const { reserva_id } = req.params;
      const { estado } = req.body; // Estado puede ser 'aceptada', 'rechazada', o 'cancelada'
  
      // Validar estado
      if (!['aceptada', 'rechazada', 'cancelada'].includes(estado)) {
        return res.status(400).json({ success: false, message: 'Estado inválido.' });
      }
  
      // Buscar reserva
      const reserva = await Reserva.findByPk(reserva_id);
      if (!reserva) {
        return res.status(404).json({ success: false, message: 'Reserva no encontrada.' });
      }
  
      // Actualizar estado
      reserva.estado = estado;
      await reserva.save();
  
      // Generar notificación para el usuario
      await crearNotificacionUsuario({
        body: {
          usuario_id: reserva.usuario_id,
          mensaje: `Tu reserva para el día ${reserva.fecha_reserva} ha sido ${estado}.`,
          tipo_notificacion: 'estado_reserva',
        },
      });
  
      res.status(200).json({ success: true, data: reserva });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

export const listarReservasUsuario = async (req, res) => {
    try {
      const { usuario_id } = req.params;
  
      const reservas = await Reserva.findAll({
        where: { usuario_id },
        include: [{ model: Espacio, as: 'espacio' }],
      });
  
      res.status(200).json({ success: true, data: reservas });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
  
export const listarReservasPropietario = async (req, res) => {
    try {
      const { propietario_id } = req.params;
  
      const reservas = await Reserva.findAll({
        where: { propietario_id },
        include: [{ model: Espacio, as: 'espacio' }],
      });
  
      res.status(200).json({ success: true, data: reservas });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};


export const eliminarReserva = async (req, res) => {
    try {
      const { reserva_id } = req.params;
  
      const reserva = await Reserva.findByPk(reserva_id);
      if (!reserva) {
        return res.status(404).json({ success: false, message: 'Reserva no encontrada.' });
      }
  
      await reserva.destroy();
  
      res.status(200).json({ success: true, message: 'Reserva eliminada correctamente.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
  