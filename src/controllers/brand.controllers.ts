import { Request, Response } from "express";
import { insertData} from "../services/brand/Insert.services";
import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/update.services";
import Category from "../interface/category";
import Brand from "../interface/brand";


export const createBrand = async (req: Request, res: Response) => {
  const tableName = "marca"; // Reemplaza con el nombre de tu tabla
  const data: Brand = req.body;
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertData(tableName, data);

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marca:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getBrand = async (req: Request, res: Response) => {
  const tableName = "marca"; // Reemplaza con el nombre de tu tabla

  try {
    const brandData = await getData(tableName);
    res.json(brandData);
  } catch (error) {
    console.error("Error getting brand data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getActivity = async (req: Request, res: Response) => {
  const tableName = "activityView"; // Reemplaza con el nombre de tu tabla

  try {
    const gardenData = await getData(tableName);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


// tu controlador
export const updateGarden = async (req: Request, res: Response) => {
  const tableName = "garden";
  const newData: Garden = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateData(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneGarden = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "garden"; // Reemplaza con el nombre de tu tabla

  try {
    const gardenData = await getOneData(tableName, parseInt(id, 10));

    if (gardenData) {
      res.json(gardenData);
    } else {
      res.status(404).json({ message: "Garden not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGarden = async (req: Request, res: Response) => {
  const tableName = "garden"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: Garden = req.body;
  const id = req.params;

  try {
    await deleteGardenData(tableName, newData, id);

    res.json({ message: "Data delete successfully", newData });
  } catch (error) {
    console.error("Error deleting garden data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};