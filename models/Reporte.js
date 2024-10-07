import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Reporte = sequelize.define('Reporte', {
  reporte_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'usuario_id',
    },
  },
  fecha_generacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  ingresos_totales: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservas_totales: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Reporte',
});

export default Reporte;
