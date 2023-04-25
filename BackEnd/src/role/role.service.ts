import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@common/prisma';

@Injectable()
export class RoleService {
    constructor(
        private prismaService: PrismaService
    ) {
    }

    async findAll() {
        const roles = await this.prismaService.role.findMany({});

        return roles.map(role => ({
            id: role.id,
            name: role.name
        }));
    }

    async findOne(id: number) {
        const role = await this.prismaService.role.findUnique({
            where: {
                id: id
            }
        });

        if (role === null) {
            throw new NotFoundException();
        }

        return {
            id: role.id,
            name: role.name
        };
    }
}
