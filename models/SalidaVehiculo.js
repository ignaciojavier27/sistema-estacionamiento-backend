import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import IngresoVehiculo from './IngresoVehiculo.js';

const SalidaVehiculo = sequelize.define('SalidaVehiculo', {
  salida_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ingreso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: IngresoVehiculo,
      key: 'ingreso_id',
    },
  },
  hora_salida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total_a_pagar: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  recibo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'SalidaVehiculo',
});

SalidaVehiculo.belongsTo(IngresoVehiculo, { foreignKey: 'ingreso_id' });

export default SalidaVehiculo;
