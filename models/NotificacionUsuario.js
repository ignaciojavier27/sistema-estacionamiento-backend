import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';
import Reserva from './Reserva.js';

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
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('leido', 'no leido'),
    defaultValue: 'no leido',
  },
  reserva_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: Reserva,
      key: 'reserva_id',
    },
    allowNull: false,
  },
}, {
  tableName: 'NotificacionUsuario',
  timestamps: false
});

Usuario.hasMany(NotificacionUsuario, { foreignKey: 'usuario_id' });
NotificacionUsuario.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Reserva.hasMany(NotificacionUsuario, { foreignKey: 'reserva_id' });
NotificacionUsuario.belongsTo(Reserva, { foreignKey: 'reserva_id', as: 'reserva'}); 
export default NotificacionUsuario;
