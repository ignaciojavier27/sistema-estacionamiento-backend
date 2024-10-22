import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Espacio = sequelize.define('Espacio', {
  espacio_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estacionamiento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Estacionamiento',
      key: 'estacionamiento_id',
    },
  },
  numero_espacio: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ingreso_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'IngresoVehiculo',
      key: 'ingreso_id',
    },
    comment: 'Referencia al ingreso de vehículo si el espacio está ocupado',
  },
  patente: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Patente del vehículo asociado al espacio',
  }
}, {
  timestamps: false,
  tableName: 'Espacio',
});

export default Espacio;
