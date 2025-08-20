import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token verification failed" });
  }
};
