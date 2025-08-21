import { Role } from '../../types/roles';

export const userPermissions: Record<string, Role[]> = {
    CREATE_USER: ['SuperAdmin'],
    GET_USERS: ['SuperAdmin'],
};
