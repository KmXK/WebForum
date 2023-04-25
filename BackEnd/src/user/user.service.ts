import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { User } from '@prisma/client';
import { UserIdentity } from './interfaces/user-identity.interface';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async get(id: string): Promise<UserIdentity> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });

        if (user === null) {
            throw new NotFoundException();
        }

        return {
            id: user.id,
            login: user.login,
            avatarUrl: user.avatarUrl,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.roleId
        };
    }

    getByLogin(login: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {
                login
            }
        });
    }
}
