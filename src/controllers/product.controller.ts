import { Request, Response } from "express";
import ProductServices from "../services/Product.services";
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.postProduct(req.body);
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  createProduct,
};
