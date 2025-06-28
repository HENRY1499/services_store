import { Request, Response } from "express";
import ProductServices from "../services/Product.services";

const getProduct = async (_req: Request, res: Response) => {
  try {
    const product = await ProductServices.getProduct();
    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.postProduct(req.body);
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const updatedProduct = async (req: Request, res: Response) => {
  if (!req.body.pid) {
    throw new Error("No se encontro ninguna id");
  }

  try {
    const productUpdated = await ProductServices.updatedProduct(req.body);
    return res.status(201).json(productUpdated);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  getProduct,
  createProduct,
  updatedProduct,
};
