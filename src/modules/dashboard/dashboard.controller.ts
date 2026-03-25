import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/response";
import { getDashboardSummary } from "./dashboard.service";

export async function getDashboardSummaryController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getDashboardSummary();
    return successResponse(
      res,
      "Dashboard summary fetched successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
}
