import { Router } from "express";
import productController from "../controllers/product.controller";
const router = Router();

router.post("/save", productController.createProduct);

export default router;
