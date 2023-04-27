import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';

@Injectable()
export class UserService extends ServiceBase {
    constructor(
        private readonly prismaService: PrismaService
    ) {
        super();
    }

    async findOne(id: string) {
        return this.map(
            await this.prismaService.user.findUnique({
                where: {
                    id
                }
            })
        );
    }

    async findByMessage(messageId: string) {
        return this.map(
            await this.prismaService.message.findUnique({
                where: {
                    id: messageId
                },
                select: {
                    sender: true
                }
            }).sender()
        );
    }

    async findBySection(sectionId: number) {
        return this.map(
            await this.prismaService.section.findUnique({
                where: {
                    id: sectionId
                },
                select: {
                    author: true
                }
            }).author()
        );
    }

    protected mapElement(user: any): {} {
        return {
            id: user.id,
            login: user.login,
            avatarUrl: user.avatarUrl,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId
        }
    }
}
