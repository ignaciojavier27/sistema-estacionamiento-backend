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
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'usuario_id',
    },
  },
}, {
  timestamps: false,
  tableName: 'Reserva',
});

export default Reserva;
