import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './common/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
        const {where, data} = params;
        return this.prisma.user.update({
            where,
            data,
            include: {role: true}
        });
    }

    async getUserBy(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findFirst({
            where,
            include: {role: true}
        });
    }
}
