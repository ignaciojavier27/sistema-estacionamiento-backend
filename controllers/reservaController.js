import Reserva from '../models/Reserva.js';
import { crearNotificacionPropietario } from './notificacionesController.js';

export const crearReserva = async (req, res) => {
  try {
    const { usuario_id, fecha_reserva, hora_inicio, propietario_id, patente } = req.body;

    if (!patente || patente.trim() === '') {
      return res.status(400).json({ success: false, message: 'La patente del vehículo es requerida.' });
    }

    const nuevaReserva = await Reserva.create({
      usuario_id,
      fecha_reserva,
      hora_inicio,
      patente,
      propietario_id,
    });

    try {
      const notificacionPropietario = await crearNotificacionPropietario({
        propietario_id,
        mensaje: `Nueva reserva recibida para el día ${fecha_reserva}.`,
        tipo_notificacion: 'nueva_reserva',
        reserva_id: nuevaReserva.reserva_id,
      });

      const notificacionUsuario = await crearNotificacionUsuario({
        usuario_id,
        mensaje: `Reserva A CONFIRMAR para el día ${fecha_reserva}.`,
        tipo_notificacion: 'nueva_reserva',
        reserva_id: nuevaReserva.reserva_id,
      });

      console.log("Notificación Propietario creada:", notificacionPropietario);
      console.log("Notificación Usuario creada:", notificacionUsuario);



    } catch (error) {

      console.error("Error al crear la notificación al propietario:", error);

      return res.status(201).json({
        data: nuevaReserva,
        warning: "Reserva creada, pero no se pudo notificar al propietario.",
      });
    }

    return res.status(201).json({ nuevaReserva });
  } catch (error) {
    console.log("Error al crear reserva:", error);
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

    // Crear notificación para el usuario asociada a la reserva
    try {
      await crearNotificacionUsuario({
        usuario_id: reserva.usuario_id,
        mensaje: `Tu reserva para el día ${reserva.fecha_reserva} ha sido ${estado}.`,
        tipo_notificacion: 'estado_reserva',
        reserva_id: reserva_id, // Asociar notificación con la reserva
      });
    } catch (error) {
      console.error("Error al crear la notificación para el usuario:", error);
      return res.status(200).json({
        success: true,
        data: reserva,
        warning: "Estado actualizado, pero no se pudo notificar al usuario.",
      });
    }

    res.status(200).json({ reserva });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const listarReservasUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const reservas = await Reserva.findAll({
      where: { usuario_id },
      include: [{ model: NotificacionUsuario }],
    });

    res.status(200).json({ reservas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const listarReservasPropietario = async (req, res) => {
  try {
    const { propietario_id } = req.params;

    const reservas = await Reserva.findAll({
      where: { propietario_id },
      include: [{ model: NotificacionPropietario }],
    });

    res.status(200).json({ reservas });
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

    // Eliminar notificaciones asociadas a la reserva
    await NotificacionUsuario.destroy({ where: { reserva_id } });
    await NotificacionPropietario.destroy({ where: { reserva_id } });

    // Eliminar la reserva
    await reserva.destroy();

    res.status(200).json({ success: true, message: 'Reserva eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
