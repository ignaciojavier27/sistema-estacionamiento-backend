import NotificacionPropietario from "../models/NotificacionPropietario.js";
import NotificacionUsuario from "../models/NotificacionUsuario.js";

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
        order: [['fecha_envio', 'DESC']],
      });
  
      res.status(200).json({ notificaciones });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};


export const obtenerNotificacionesPropietario = async (req, res) => {
    try {
      const { propietario_id } = req.params;
  
      const notificaciones = await NotificacionPropietario.findAll({
        where: { propietario_id }
      });
  
      res.status(200).json({ notificaciones });
    } catch (error) {
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