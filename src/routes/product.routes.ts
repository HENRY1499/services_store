import { Router } from "express";
import productController from "../controllers/product.controller";
const router = Router();

router.get("/", productController.getProduct);
router.post("/save", productController.createProduct);

export default router;
