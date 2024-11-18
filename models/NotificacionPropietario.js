import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';

const NotificacionPropietario = sequelize.define('NotificacionPropietario', {
  notificacion_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'usuario_id',
    },
  },
  mensaje: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipo_notificacion: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('leído', 'no leído'),
    defaultValue: 'no leído',
  },
}, {
  tableName: 'NotificacionPropietario',
  timestamps: true,
  createdAt: 'fecha_envio',
  updatedAt: false,
});

Usuario.hasMany(NotificacionPropietario, { foreignKey: 'propietario_id' });
NotificacionPropietario.belongsTo(Usuario, { foreignKey: 'propietario_id' });

export default NotificacionPropietario;
