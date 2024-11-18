import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';

const NotificacionUsuario = sequelize.define('NotificacionUsuario', {
  notificacion_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario_id: {
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
  tableName: 'NotificacionUsuario',
  timestamps: true,
  createdAt: 'fecha_envio',
  updatedAt: false,
});

Usuario.hasMany(NotificacionUsuario, { foreignKey: 'usuario_id' });
NotificacionUsuario.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export default NotificacionUsuario;
