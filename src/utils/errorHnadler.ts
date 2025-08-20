import { Request, Response, NextFunction } from 'express';
import { ApiError } from './apiError';
import { sendError } from './responseHandler';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ApiError) {
        return sendError(res, err);
    }

    const genericError = new ApiError(err.message || 'Something went wrong', 500);
    return sendError(res, genericError);
}
