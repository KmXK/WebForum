import { Role, User } from '@prisma/client';

export class AuthDto {
    login: string;
    password: string;
}


export class PayloadUserDto {
    id: string;
    login: string;

    constructor(
        data: User & { role: Role }
    ) {
        this.id = data.id.trim();
        this.login = data.login.trim();
    }
}
