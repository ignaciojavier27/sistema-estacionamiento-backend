import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import SalidaVehiculo from './SalidaVehiculo.js';

const Pago = sequelize.define('Pago', {
  pago_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  salida_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SalidaVehiculo',
      key: 'salida_id',
    },
  },
  metodo_pago: {
    type: DataTypes.ENUM('tarjeta', 'efectivo', 'paypal'),
    allowNull: false,
  },
  fecha_pago : {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Pago',
});

Pago.belongsTo(SalidaVehiculo, { foreignKey: 'salida_id' });

export default Pago;
