import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Reserva = sequelize.define('Reserva', {
  reserva_id: {
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
  espacio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Espacio',
      key: 'espacio_id',
    },
  },
  fecha_reserva: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'cancelada'),
    defaultValue: 'pendiente',
    allowNull: false,
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'usuario_id',
    },
  },
  margen_minutos: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
}, {
  timestamps: false,
  tableName: 'Reserva',
});

export default Reserva;
