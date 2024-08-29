import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import userRoutes from './routes/user.routes';
import loginRoutes from './routes/login.routes';
import protectedRoutes from './routes/protected.routes';
import HangarRoutes from './routes/Hangar.routes';
import StateRoutes from './routes/state.routes';
import TruckRoutes from './routes/truck.routes';
import LevelRoutes from './routes/level.routes';

import { verifyToken } from './middleware/auth';
import CamionRoutes from './routes/camion.routes';
import { createTruck, deleteTruck, fetchTruckData, fetchTruckDataById, updateTruck } from './controllers/truck.controllers'; 
import { fetchHangar2 } from './controllers/pantallas.controllers';
import { createTruckInDB } from './services/truck/insertTruck.services';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5001",
    methods: ["GET", "POST"]
  }
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(loginRoutes);
app.use(userRoutes);
app.use(HangarRoutes);
app.use(CamionRoutes);
app.use(StateRoutes);
app.use(TruckRoutes);
app.use(LevelRoutes);

app.use(protectedRoutes);

// Manejar la conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo requestListTruckView conectado:', socket.id);

  socket.on('requestListTruckView', async () => {
    try {
      const truckData = await fetchTruckData(); 
      socket.emit('listTruckViewData', { data: truckData });
    } catch (error) {
      console.error("Error obteniendo datos de camiones:", error);
      if (error instanceof Error) {
        socket.emit('listTruckViewData', { error: error.message });
      } else {
        socket.emit('listTruckViewData', { error: 'Error desconocido' });
      }
    }
  });

 
  socket.on('createTruckState', async ({ newData }) => {
    try {
      // Inserta los datos en la base de datos y obtén la respuesta completa, incluyendo el ID
      const createdTruck = await createTruckInDB(newData);
  
      // Emitir el evento de vuelta a todos los clientes conectados con los datos completos del camión creado
      io.emit('truckStateUpdated', createdTruck);
    } catch (error) {
      console.error("Error creando el estado del camión:", error);
      if (error instanceof Error) {
        socket.emit('truckStateCreated', { error: error.message });
      } else {
        socket.emit('truckStateCreated', { error: 'Error desconocido' });
      }
    }
  });
  

  socket.on('requestListHangar2', async () => {
    try {
      const hangar2Data = await fetchHangar2(); 
      socket.emit('listHangar2ViewData', { data: hangar2Data });
    } catch (error) {
      console.error("Error obteniendo datos del hangar2:", error);
      if (error instanceof Error) {
        socket.emit('listHangar2ViewData', { error: error.message });
      } else {
        socket.emit('listHangar2ViewData', { error: 'Error desconocido' });
      }
    }
  });

  // Manejar la actualización del estado de un camión
  socket.on('updateTruckState', async ({ truckId, newState }) => {
    // console.log("camion desde el back",truckId);
    //  console.log("estado desde el back",newState);
    try {
      // Aquí actualizas la base de datos con el nuevo estado
      await updateTruck(truckId, newState);


      // Emitir el evento de vuelta a todos los clientes conectados
      const updatedTruck = await fetchTruckDataById(truckId);
      io.emit('truckStateUpdated', updatedTruck);
    } catch (error) {
      console.error("Error actualizando el estado del camión:", error);
      if (error instanceof Error) {
        socket.emit('truckStateUpdated', { error: error.message });
      } else {
        socket.emit('truckStateUpdated', { error: 'Error desconocido' });
      }
    }
    
  });


    // Manejar la delete de un camión
    socket.on('deleteTruckState', async ({ truckId, newState }) => {
      // console.log("camion desde el back",truckId);
      //  console.log("estado desde el back",newState);
      try {
        // Aquí actualizas la base de datos con el nuevo estado
        await deleteTruck(truckId, newState);
  
  
        // Emitir el evento de vuelta a todos los clientes conectados
        const updatedTruck = await fetchTruckDataById(truckId);
        io.emit('deleteTruck', updatedTruck);
      } catch (error) {
        console.error("Error actualizando el estado del camión:", error);
        if (error instanceof Error) {
          socket.emit('deleteTruck', { error: error.message });
        } else {
          socket.emit('deleteTruck', { error: 'Error desconocido' });
        }
      }
      
    });
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

app.use(celebrateErrors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export { io, server }; // Exporta `io` y `server`
export default app;
