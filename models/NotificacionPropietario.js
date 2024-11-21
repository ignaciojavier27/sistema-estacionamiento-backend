import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';
import Reserva from './Reserva.js';

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
  tableName: 'NotificacionPropietario',
  timestamps: false
});

Usuario.hasMany(NotificacionPropietario, { foreignKey: 'propietario_id' });
NotificacionPropietario.belongsTo(Usuario, { foreignKey: 'propietario_id' });

Reserva.hasMany(NotificacionPropietario, { foreignKey: 'reserva_id' });
NotificacionPropietario.belongsTo(Reserva, { foreignKey: 'reserva_id', as: 'reserva' });


export default NotificacionPropietario;
