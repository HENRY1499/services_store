import { Request, Response } from "express";
import CategoryServices from "../services/Category.services";

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryServices.postCategory(req.body);
    return res.status(201).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  createCategory,
};
