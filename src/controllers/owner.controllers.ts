import { Request, Response } from "express";
import { getData} from "../genericQueries/getBuilder";
import { getOneData} from "../genericQueries/getOne.services";
import { insertOwnerData } from "../services/owner/Insert.services";
import Owner from "../interface/owner";
import { updateData } from "../services/owner/update.services";
import { deleteOwnerData } from "../services/owner/delete.services";


export const createOwner = async (req: Request, res: Response) => {
  const tableName = "owner"; // Reemplaza con el nombre de tu tabla
  const data: Owner = req.body;
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertOwnerData(tableName, data);

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating owner:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOwner = async (req: Request, res: Response) => {
  const tableName = "owner"; 
  try {
    const ownerData = await getData(tableName);
    res.json(ownerData);
  } catch (error) {
    console.error("Error getting owner data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const updateOwner = async (req: Request, res: Response) => {
  const tableName = "owner";
  const newData: Owner = req.body;
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

export const getOneOwner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "owner"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (error) {
    console.error("Error getting Owner data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
export const deleteOwner = async (req: Request, res: Response) => {
  const tableName = "owner"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: Owner = req.body;
  const id = req.params;

  try {
    await deleteOwnerData(tableName, newData, id);

    res.json({ message: "Data delete successfully", newData });
  } catch (error) {
    console.error("Error deleting owner data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};