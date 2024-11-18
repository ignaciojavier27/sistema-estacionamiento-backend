import NotificacionPropietario from "../models/NotificacionPropietario";
import NotificacionUsuario from "../models/NotificacionUsuario";

export const crearNotificacionUsuario = async (req, res) => {
    try {
      const { usuario_id, mensaje, tipo_notificacion } = req.body;
  
      const nuevaNotificacion = await NotificacionUsuario.create({
        usuario_id,
        mensaje,
        tipo_notificacion,
      });
  
      res.status(201).json({ success: true, data: nuevaNotificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

export const crearNotificacionPropietario = async (req, res) => {
    try {
      const { propietario_id, mensaje, tipo_notificacion } = req.body;
  
      const nuevaNotificacion = await NotificacionPropietario.create({
        propietario_id,
        mensaje,
        tipo_notificacion,
      });
  
      res.status(201).json({ success: true, data: nuevaNotificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};


export const obtenerNotificacionesUsuario = async (req, res) => {
    try {
      const { usuario_id } = req.params;
  
      const notificaciones = await NotificacionUsuario.findAll({
        where: { usuario_id },
        order: [['fecha_envio', 'DESC']],
      });
  
      res.status(200).json({ success: true, data: notificaciones });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};


export const obtenerNotificacionesPropietario = async (req, res) => {
    try {
      const { propietario_id } = req.params;
  
      const notificaciones = await NotificacionPropietario.findAll({
        where: { propietario_id },
        order: [['fecha_envio', 'DESC']],
      });
  
      res.status(200).json({ success: true, data: notificaciones });
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
  
      notificacion.estado = 'leído';
      await notificacion.save();
  
      res.status(200).json({ success: true, data: notificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};