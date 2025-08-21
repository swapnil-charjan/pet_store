import { userPermissions } from './userPermissions';
import { petPermissions } from './petPermissions';

export const permissions = {
    ...userPermissions,
    ...petPermissions,
};

export type PermissionKey = keyof typeof permissions;
