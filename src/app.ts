import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import userRoutes from './routes/user.routes';
import gardenRoutes from './routes/garden.routes';
import ownerRoutes from './routes/owner.routes';
import categoryRoutes from './routes/category.routes';
import brandRoutes from './routes/brand.routes';
import supplierRoutes from './routes/supplier.routes';
import productRoutes from './routes/product.routes';
import loginRoutes from './routes/login.routes';
import protectedRoutes from './routes/protected.routes';
import HangarRoutes from './routes/Hangar.routes';
import StateRoutes from './routes/state.routes';
import TruckRoutes from './routes/truck.routes';

import { verifyToken } from './middleware/auth';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas que no requieren autenticación
app.use(loginRoutes);

// Aplicar el middleware de autenticación a todas las demás rutas
// app.use(verifyToken);

// Rutas protegidas
app.use(userRoutes);
app.use(gardenRoutes);
app.use(ownerRoutes);
app.use(categoryRoutes);
app.use(brandRoutes);
app.use(supplierRoutes);
app.use(productRoutes);
app.use(HangarRoutes);
app.use(StateRoutes);
app.use(TruckRoutes);

app.use(protectedRoutes);

app.use(celebrateErrors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
