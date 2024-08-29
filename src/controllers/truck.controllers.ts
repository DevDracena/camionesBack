// truck.controllers.ts

import { Request, Response } from "express";
// import { insertData } from "../services/truck/Insert.services";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/truck/update.services";
import Truck from "../interface/truck";
import { io } from "../app"; 
import { deleteTruckData } from "../services/truck/delete.services";
import { createTruckInDB } from "../services/truck/insertTruck.services";

// Función reutilizable para obtener datos de la tabla "listTruckView"
export const fetchTruckData = async () => {
  const tableName = "listTruckView"; 
  try {
    const data = await getData(tableName);
    return data;
  } catch (error) {    
    console.error("Error getting truck list data:", error);
    throw error;
  }
};

// Controlador Express que utiliza `fetchTruckData`
export const getListTruck = async (req: Request, res: Response) => {
  try {
    const data = await fetchTruckData();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Otros controladores...

export const createTruck = async (req: Request, res: Response) => {
  const data: Truck = req.body;
  try {
    const resp = await createTruckInDB(data);
    res.json({ message: "Data inserted successfully", resp });
  } catch (error) {
    console.error("Error creating truck:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getTruck = async (req: Request, res: Response) => {
  const tableName = "truck";
  try {
    const truckData = await getData(tableName);
    res.json(truckData);
  } catch (error) {
    console.error("Error getting truck data:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateTruck = async (truckId: any, data: any) => {
  const tableName = "truck";
  const newData: Truck = data;
  
  // console.log("camion desde el back",truckId);
  // console.log("estado desde el back",newState);
  const id = truckId;
  try {
    await updateData(tableName, id, newData);
    
    // Emitir un evento después de la actualización
    const updatedTruck = await fetchTruckDataById(id);
    io.emit("truckDataUpdated", { id, updatedTruck });

    return { message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteTruck = async (truckId: any, data: any) => {
  const tableName = "truck";
  const newData: Truck = data;
  
  // console.log("camion desde el back",truckId);
  // console.log("estado desde el back",newState);
  const id = truckId;
  try {
    await deleteTruckData(tableName, id, newData);
    
    // // Emitir un evento después de la actualización
    // const updatedTruck = await fetchTruckDataById(id);
    // io.emit("truckDataUpdated", { id });

    return { message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};



// Función reutilizable para obtener datos de un camión por ID
export const fetchTruckDataById = async (id: string) => {
  const tableName = "truck"; 
  // console.log("id desde find id xd",id);

  try {
    const data = await getOneData(tableName, parseInt(id, 10));
    return data;
  } catch (error) {
    console.error("Error getting truck data by ID:", error);
    throw error;
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "user";
  try {
    const data = await getOneData(tableName, parseInt(id, 10));
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGarden = async (req: Request, res: Response) => {
  const tableName = "garden";
  const newData: Truck = req.body;
  const id = req.params;
  try {
    await deleteGardenData(tableName, newData, id);
    res.json({ message: "Data deleted successfully", newData });
  } catch (error) {
    console.error("Error deleting garden data:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
