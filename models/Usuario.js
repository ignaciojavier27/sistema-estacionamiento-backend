import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasenia: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

export default Usuario;
