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
}, {
  timestamps: false,
  tableName: 'Espacio',
});

export default Espacio;
