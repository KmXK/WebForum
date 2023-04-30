import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { AuthUser } from './models/auth/auth-user.model';
import { AuthResponseModel } from './models/auth/auth-response.model';
import AuthService from './services/auth.service';

export default class Store {
    user: AuthUser | null = null;
    isAuth?: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUser(user: AuthUser | null) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser(null);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.post<AuthResponseModel>(
                '/api/auth/refresh',
                null,
                {
                    withCredentials: true
                });
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            this.setIsAuth(false);
            console.log(error.response?.data?.message);
        }
    }
}
