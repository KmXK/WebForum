import { User } from '../user/user.model';

export interface AuthResponseModel {
    accessToken: string;
    user: User;
}
