import { Request, Response } from "express";
import * as { postCategory } from "../services/Category.services";

export const createCategory = async (req: Request, res: Response) => {
  try {
    await postCategory(req.body);
    return res
      .status(201)
      .json({ message: "Categoria registrada con exito...!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
