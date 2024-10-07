import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Usuario from './Usuario.js';

const Estacionamiento = sequelize.define('Estacionamiento', {
  estacionamiento_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  capacidad_total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_por_minuto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  horario_disponible: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, 
      key: 'usuario_id'
    }
  }
}, {
  tableName: 'Estacionamiento',
  timestamps: false
});


Usuario.hasMany(Estacionamiento, { foreignKey: 'propietario_id' });
Estacionamiento.belongsTo(Usuario, { foreignKey: 'propietario_id' });

export default Estacionamiento;
