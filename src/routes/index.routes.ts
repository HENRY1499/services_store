import { Router } from "express";
import Category from "./category.routes";
import Product from "./product.routes";
const router = Router();

router.use("/category", Category);
router.use("/product", Product);

export default router;
