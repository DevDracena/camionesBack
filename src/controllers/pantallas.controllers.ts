// truck.controllers.ts

import { Request, Response } from "express";
import { insertData } from "../services/truck/Insert.services";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/truck/update.services";
import Truck from "../interface/truck";
import { io } from "../app"; 

// Función reutilizable para obtener datos de la tabla "listTruckView"
export const fetchHangar2 = async () => {
  const tableName = "Hangar2View"; 
  try {
    const data = await getData(tableName);
    return data;
  } catch (error) {    
    console.error("Error getting truck list data:", error);
    throw error;
  }
};

// Controlador Express que utiliza `fetchTruckData`
export const getHangar2 = async (req: Request, res: Response) => {
  try {
    const data = await fetchHangar2();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Otros controladores...



// Función reutilizable para obtener datos de un camión por ID
export const fetchTruckDataById = async (id: string) => {
  const tableName = "truck"; 
  try {
    const data = await getOneData(tableName, parseInt(id, 10));
    return data;
  } catch (error) {
    console.error("Error getting truck data by ID:", error);
    throw error;
  }
};


