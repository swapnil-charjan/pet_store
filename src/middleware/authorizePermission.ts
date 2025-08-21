import { RequestHandler, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './userMiddleware';
import { ApiError } from '../utils/apiError';
import { permissions, PermissionKey } from '../config/Permissions';
import { Role } from '../types/roles';

export function authorizePermission(permission: PermissionKey): RequestHandler {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role as Role;

        if (!permissions[permission]) {
            throw new ApiError(`Permission "${permission}" does not exist`, 400);
        }
        const allowedRoles = permissions[permission] as Role[];

        if (!userRole || !allowedRoles.includes(userRole)) {
            throw new ApiError('Access denied: insufficient permissions', 403);
        }

        next();
    };
}
