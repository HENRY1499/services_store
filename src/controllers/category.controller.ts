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
    return res.status(500).json({ message: error.message });
  }
};
export default {
  getCategory,
  createCategory,
};
