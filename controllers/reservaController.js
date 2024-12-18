import Reserva from '../models/Reserva.js';
import NotificacionUsuario from '../models/NotificacionUsuario.js';
import { crearNotificacionPropietario, crearNotificacionUsuario } from './notificacionesController.js';
import NotificacionPropietario from '../models/NotificacionPropietario.js';

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

    // Validar el estado recibido
    const estadosValidos = ['aceptada', 'rechazada', 'cancelada'];
    if (!estadosValidos.includes(estado)) {
      return res
        .status(400)
        .json({ success: false, message: 'Estado inválido. Estados permitidos: ' + estadosValidos.join(', ') });
    }

    // Buscar la reserva en la base de datos
    const reserva = await Reserva.findByPk(reserva_id);
    if (!reserva) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada.' });
    }

    // Actualizar el estado de la reserva
    reserva.estado = estado;
    await reserva.save();

    // Crear la notificación asociada para el usuario
    await crearNotificacionUsuario({
      usuario_id: reserva.usuario_id,
      mensaje: `Tu reserva para el día ${reserva.fecha_reserva} ha sido ${estado}.`,
      tipo_notificacion: 'estado_reserva',
      reserva_id: reserva_id,
    });

    // Respuesta exitosa
    res.status(200).json({ success: true, reserva });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.', error: error.message });
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
