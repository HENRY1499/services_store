import { Request, Response } from "express";
import SalesServices from "../services/Sales.services";

const verifyStock = async (req: Request, res: Response) => {
  try {
    const product = await SalesServices.verifyStock(req.body);
    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const createSales = async (req: Request, res: Response) => {
  const { details } = req.body;
  try {
    const { sale, detailSales } = await SalesServices.createSales(details);

    return res.status(201).json({
      message: "Venta registrada correctamente",
      sale,
      details: detailSales,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al registrar la venta",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export default {
  verifyStock,
  createSales,
};
