import { Router } from "express";
import { getDashboardSummaryController } from "./dashboard.controller";

const router = Router();

router.get("/summary", getDashboardSummaryController);

export default router;
