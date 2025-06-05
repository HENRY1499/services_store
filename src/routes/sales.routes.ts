import { Router } from "express";
import salesController from "../controllers/sales.controller";
const router = Router();

router.post("/verify/stock", salesController.verifyStock);

export default router;
