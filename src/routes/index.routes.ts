import { Router } from "express";
import Category from "./category.routes";
import Product from "./product.routes";
import Sales from "./sales.routes";
const router = Router();

router.use("/category", Category);
router.use("/product", Product);
router.use("/sales", Sales);

export default router;
