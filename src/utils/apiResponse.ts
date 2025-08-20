export class ApiResponse<T = any> {
    data: T | null;
    errors: any | null;
    messages: { message: string };
    status_code: number;
    is_success: boolean;

    constructor({
        data = null,
        message = '',
        status_code = 200,
        is_success = true,
        errors = null,
    }: {
        data?: T | null;
        message?: string;
        status_code?: number;
        is_success?: boolean;
        errors?: any;
    }) {
        this.data = data;
        this.errors = errors;
        this.messages = { message };
        this.status_code = status_code;
        this.is_success = is_success;
    }
}
