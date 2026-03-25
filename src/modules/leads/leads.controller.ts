import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/response";
import {
  createLeadSchema,
  updateLeadSchema,
  transitionLeadSchema,
} from "./leads.validation";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  transitionLead,
} from "./leads.service";

export async function createLeadController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = createLeadSchema.parse(req.body);
    const result = await createLead(parsed);

    return successResponse(res, "Lead created successfully", result, 201);
  } catch (error) {
    next(error);
  }
}

export async function getLeadsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getLeads(req.query);
    return successResponse(res, "Leads fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

export async function getLeadByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const result = await getLeadById(id);

    return successResponse(res, "Lead fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

export async function updateLeadController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if ("status" in req.body) {
      throw new Error(
        "Status cannot be updated from this endpoint. Use /leads/:id/transition",
      );
    }

    const id = Number(req.params.id);
    const parsed = updateLeadSchema.parse(req.body);
    const result = await updateLead(id, parsed);

    return successResponse(res, "Lead updated successfully", result);
  } catch (error) {
    next(error);
  }
}

export async function transitionLeadController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const parsed = transitionLeadSchema.parse(req.body);
    const result = await transitionLead(id, parsed);

    return successResponse(res, "Lead status updated successfully", result);
  } catch (error) {
    next(error);
  }
}
