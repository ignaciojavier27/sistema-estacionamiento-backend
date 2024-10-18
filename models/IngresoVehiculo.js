import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Espacio from './Espacio.js';

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
    references: {
      model: Espacio, 
      key: 'espacio_id',
    },
  },
  hora_ingreso: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'IngresoVehiculo',
});


IngresoVehiculo.belongsTo(Espacio, { foreignKey: 'espacio_id' });

export default IngresoVehiculo;
