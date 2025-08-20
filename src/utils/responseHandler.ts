import { Response } from 'express';
import { ApiResponse } from './apiResponse';
import { ApiError } from './apiError';

export function sendSuccess(res: Response, data: any, message = 'Success', status = 200) {
    const response = new ApiResponse({
        data,
        message,
        status_code: status,
        is_success: true,
    });
    return res.status(status).json(response);
}

export function sendError(res: Response, error: ApiError) {
    const response = new ApiResponse({
        data: null,
        message: error.message,
        status_code: error.statusCode || 500,
        is_success: false,
        errors: error.errors || null,
    });
    return res.status(error.statusCode || 500).json(response);
}
