import { AxiosResponse } from 'axios';
import { AuthResponseModel } from '../models/auth/auth-response.model';
import { api } from '../api';

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponseModel>> {
        return api.post<AuthResponseModel>(
            '/api/auth/login', {
                login,
                password
            }
        );
    }

    static async logout(): Promise<void> {
        return api.post('/api/auth/logout');
    }

    static async register(login: string, password: string) {
        return api.post<AuthResponseModel>(
            '/api/auth/register', {
                login,
                password
            }
        );
    }
}
