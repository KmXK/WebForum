import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    get(id: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {
                id
            }
        });
    }

    getByLogin(login: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {
                login
            }
        });
    }
}
