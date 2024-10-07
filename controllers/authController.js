import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrarse (Sign Up)
export const signUp = async (req, res) => {
  try {
    const { nombre, apellido, correo_electronico, contrasenia, tipo_usuario } = req.body;

    // Verificar si el correo ya existe
    const existeUsuario = await Usuario.findOne({ where: { correo_electronico } });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo_electronico,
      contrasenia: hashedPassword,
      tipo_usuario
    });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario', detalle: error.message });
  }
};


// Iniciar Sesión (Log In)
export const logIn = async (req, res) => {
  try {
    const { correo_electronico, contrasenia } = req.body;

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo_electronico } });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const esValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!esValida) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { usuarioId: usuario.usuario_id, tipo_usuario: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const nombre = usuario.nombre + ' ' + usuario.apellido;

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        usuario_id: usuario.usuario_id,
        tipo_usuario: usuario.tipo_usuario,
        correo_electronico: usuario.correo_electronico,
        nombre_usuario: nombre
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message });
  }
};