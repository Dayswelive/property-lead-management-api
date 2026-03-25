import { Request, Response, NextFunction } from "express";
import { loginSchema } from "./auth.validation";
import { loginUser } from "./auth.service";
import { successResponse } from "../../utils/response";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = loginSchema.parse(req.body);

    const result = await loginUser(parsed.email, parsed.password);

    return successResponse(res, "Login successful", result, 200);
  } catch (error) {
    next(error);
  }
}
