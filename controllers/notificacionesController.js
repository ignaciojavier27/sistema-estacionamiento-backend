import NotificacionPropietario from "../models/NotificacionPropietario.js";
import NotificacionUsuario from "../models/NotificacionUsuario.js";
import Reserva from "../models/Reserva.js";

export const crearNotificacionUsuario = async ({ usuario_id, mensaje, tipo_notificacion, reserva_id }) => {
    try {  
      const nuevaNotificacion = await NotificacionUsuario.create({
        usuario_id,
        mensaje,
        tipo_notificacion,
        reserva_id
      });
  
      return nuevaNotificacion;
    } catch (error) {
      console.error("Error al crear la notificación:", error);
      throw new Error("No se pudo crear la notificación al propietario.");
    }
};

export const crearNotificacionPropietario = async ({ propietario_id, mensaje, tipo_notificacion, reserva_id }) => {
  try {
    const nuevaNotificacion = await NotificacionPropietario.create({
      propietario_id,
      mensaje,
      tipo_notificacion,
      reserva_id,
    });
    return nuevaNotificacion;
  } catch (error) {
    console.error("Error al crear la notificación:", error);
    throw new Error("No se pudo crear la notificación al propietario.");
  }
};



export const obtenerNotificacionesUsuario = async (req, res) => {

  try {
    const { usuario_id } = req.params;

    const notificaciones = await NotificacionUsuario.findAll({
      where: { usuario_id },
      include: [
        {
          model: Reserva,
          as: 'reserva',
          attributes: ['fecha_reserva', 'hora_inicio', 'patente'],
        },
      ],
    });

    res.status(200).json({ notificaciones });
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    res.status(500).json({ success: false, error: error.message });
  }

};


export const obtenerNotificacionesPropietario = async (req, res) => {
  try {
    const { propietario_id } = req.params;

    const notificaciones = await NotificacionPropietario.findAll({
      where: { propietario_id },
      include: [
        {
          model: Reserva,
          as: 'reserva',
          attributes: ['fecha_reserva', 'hora_inicio', 'patente'],
        },
      ],
    });

    res.status(200).json({ notificaciones });
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const marcarNotificacionLeida = async (req, res) => {
    try {
      const { id, tipo } = req.params; // `tipo` será 'usuario' o 'propietario'
  
      const modelo = tipo === 'usuario' ? NotificacionUsuario : NotificacionPropietario;
  
      const notificacion = await modelo.findByPk(id);
  
      if (!notificacion) {
        return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
      }
  
      notificacion.estado = 'leido';
      await notificacion.save();
  
      res.status(200).json({ notificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

export const eliminarNotificacionUsuario = async ( req, res ) => {
  try {
    const { notificacion_id } = req.params;
    const notificacion = await NotificacionUsuario.findByPk(notificacion_id);
    if (!notificacion) {
      return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
    }

    await notificacion.destroy();
    res.status(200).json({ success: true, message: 'Notificación eliminada correctamente' });

  }catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export const eliminarNotificacionPropietario = async ( req, res ) => {
  try {
    const { notificacion_id } = req.params;
    const notificacion = await NotificacionPropietario.findByPk(notificacion_id);
    if (!notificacion) {
      return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
    }

    await notificacion.destroy();
    res.status(200).json({ success: true, message: 'Notificación eliminada correctamente' });
    
  }catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}