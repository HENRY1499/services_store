import { Request, Response } from "express";
import CategoryServices from "../services/Category.services";

const getCategory = async (_req: Request, res: Response) => {
  try {
    const category = await CategoryServices.getCategory();
    return res.status(200).json({ category });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Ocurrio un error al traer los datos" });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryServices.postCategory(req.body);
    return res.status(201).json(category);
  } catch (error: any) {
    console.log("error:", error);
    return res.status(500).json({ message: error.message });
  }
};
const updatedCategory = async (req: Request, res: Response) => {
  if (!req.body.id_categories) {
    throw new Error("No se encontro la category");
  }
  try {
    const categoryUpdated = await CategoryServices.updatedCategory(req.body);
    return res.status(201).json(categoryUpdated);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  getCategory,
  createCategory,
  updatedCategory,
};
