import { Request, Response, NextFunction } from "express";
import { getProperties, getPropertyById } from "./properties.service";
import { successResponse } from "../../utils/response";

export async function getPropertiesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getProperties(req.query);
    return successResponse(res, "Properties fetched", result);
  } catch (error) {
    next(error);
  }
}

export async function getPropertyByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    const result = await getPropertyById(id);

    return successResponse(res, "Property fetched", result);
  } catch (error) {
    next(error);
  }
}
