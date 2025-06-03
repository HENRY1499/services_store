import { Router } from "express";
import Category from "./category.routes";
const router = Router();

router.use("/category", Category);

export default router;
