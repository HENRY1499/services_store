import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

router.get("/", CategoryController.getCategory);
router.post("/save", CategoryController.createCategory);

export default router;
