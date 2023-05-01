import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';
import { UpdateUserInput } from './dto/update-user.input';
import { UserInputError } from '@nestjs/apollo';

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

    async update(userId: string, updateUserInput: UpdateUserInput) {
        if (updateUserInput.firstName === undefined &&
            updateUserInput.lastName === undefined &&
            updateUserInput.login === undefined
        ) {
            return this.findOne(userId);
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                login: updateUserInput.login
            },
            select: {
                id: true
            }
        });

        if (user !== null && user.id !== userId) {
            throw new UserInputError('User with current login already exists');
        }

        return this.map(
            await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    login: updateUserInput.login,
                    firstName: updateUserInput.firstName,
                    lastName: updateUserInput.lastName
                }
            })
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
