import { Role } from '../../types/roles';

export const petPermissions: Record<string, Role[]> = {
    CREATE_PET: ['Admin', 'SuperAdmin'],
    UPDATE_PET: ['Admin', 'SuperAdmin'],
    DELETE_PET: ['Admin', 'SuperAdmin'],
    GET_PETS: ['Admin', 'SuperAdmin', 'User'],
};
