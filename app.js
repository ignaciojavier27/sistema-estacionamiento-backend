import express, { json } from 'express';
import cors from 'cors';
import { config }  from 'dotenv';
import { connectDB } from './config/database.js';
import { syncModels } from './config/syncModel.js';
import usuarioRoutes from './routes/usuarioRouter.js';
import estacionamientoRoutes from './routes/estacionamientoRouter.js';
import authRoutes from './routes/authRouter.js';
import espacioRoutes from './routes/espacioRouter.js';
import ingresoVehiculoRoutes from './routes/ingresoVehiculoRouter.js';
import salidaVehiculoRoutes from './routes/salidaVehiculoRouter.js';



config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

connectDB();
syncModels();

app.use('/api', usuarioRoutes);
app.use('/api', estacionamientoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', espacioRoutes);
app.use('/api', ingresoVehiculoRoutes)
app.use('/api', salidaVehiculoRoutes)


app.listen(port, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${port}`);
});
