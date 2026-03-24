import jwt from "jsonwebtoken";
import { env } from "../config/env";

type JwtPayload = {
  userId: number;
  email: string;
  role: string;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
