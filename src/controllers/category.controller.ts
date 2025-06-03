import { Request, Response } from "express";
import CategoryServices from "../services/Category.services";

const createCategory = async (req: Request, res: Response) => {
  try {
    await CategoryServices.postCategory(req.body);
    return res
      .status(201)
      .json({ message: "Categoria registrada con exito...!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  createCategory,
};
