import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Notificacion = sequelize.define('Notificacion', {
  notificacion_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'usuario_id',
    },
  },
  mensaje: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_envio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipo_notificacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Notificacion',
});

export default Notificacion;
