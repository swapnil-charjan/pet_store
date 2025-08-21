import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";
import { Role } from "../types/roles";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: Role;
    };
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
    req.user = {
      userId: (decoded as any).userId,
      email: (decoded as any).email,
      role: (decoded as any).role, 
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token verification failed" });
  }
};
