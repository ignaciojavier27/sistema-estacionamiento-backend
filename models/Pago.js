import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Pago = sequelize.define('Pago', {
  pago_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reserva_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Reserva',
      key: 'reserva_id',
    },
  },
  monto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Pago',
});

export default Pago;
