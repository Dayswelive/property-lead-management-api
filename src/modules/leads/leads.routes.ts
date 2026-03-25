import { Router } from "express";
import {
  createLeadController,
  getLeadsController,
  getLeadByIdController,
  updateLeadController,
  transitionLeadController,
} from "./leads.controller";

const router = Router();

router.post("/", createLeadController);
router.get("/", getLeadsController);
router.get("/:id", getLeadByIdController);
router.patch("/:id", updateLeadController);
router.post("/:id/transition", transitionLeadController);

export default router;
