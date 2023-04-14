import axios, { AxiosResponse } from 'axios';
import { AuthResponseModel } from '../models/auth/auth-response.model';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseModel>> {
        return axios.post<AuthResponseModel>(
            '/api/auth/login', {
                email,
                password
            }
        );
    }

    static async logout(): Promise<void> {
        return axios.post('/api/auth/logout');
    }
}
