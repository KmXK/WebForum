import { RoleType } from '@shared/enums';

export interface UserIdentity {
    id: string;
    login: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    avatarUrl: string | null;
    role: RoleType;
}