import Usuario from "../models/Usuario.js";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo_electronico, contrasenia, tipo_usuario } = req.body;
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo_electronico,
      contrasenia,
      tipo_usuario
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message });
  }
};


export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', detalle: error.message });
  }
};


export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', detalle: error.message });
  }
};


export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo_electronico, contrasenia, tipo_usuario } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nombre = nombre;
      usuario.apellido = apellido;
      usuario.correo_electronico = correo_electronico;
      usuario.contrasenia = contrasenia;
      usuario.tipo_usuario = tipo_usuario;
      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', detalle: error.message });
  }
};


export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', detalle: error.message });
  }
};
