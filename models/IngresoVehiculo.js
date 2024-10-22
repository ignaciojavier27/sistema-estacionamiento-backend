import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const IngresoVehiculo = sequelize.define('IngresoVehiculo', {
  ingreso_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patente: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  espacio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hora_ingreso: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'IngresoVehiculo',
});

export default IngresoVehiculo;
