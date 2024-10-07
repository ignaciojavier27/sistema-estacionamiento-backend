import { Sequelize } from 'sequelize';
import { config }  from 'dotenv';

config();


export const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      connectTimeout: 20000
    },
    port: process.env.DB_PORT
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Se ha realizado la conexión a la base de datos con éxito.');
  } catch (error) {
    console.error('Error al conectar a la base de datos: ', error);
  }
};

