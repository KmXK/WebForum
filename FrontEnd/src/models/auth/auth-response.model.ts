import { AuthUser } from './auth-user.model';

export interface AuthResponseModel {
    accessToken: string;
    user: AuthUser;
}
