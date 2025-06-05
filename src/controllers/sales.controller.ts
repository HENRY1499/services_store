import { Request, Response } from "express";
import SalesServices from "../services/Sales.services";

const verifyStock = async (req: Request, res: Response) => {
  try {
    const product = await SalesServices.verifyStock(req.body);
    return res.status(200).json(product);
  } catch (error: any) {
    // console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export default {
  verifyStock,
};
