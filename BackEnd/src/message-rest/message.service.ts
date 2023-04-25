import { PrismaService } from '@common/prisma';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '@models';
import { MessageType, RoleType } from '@shared/enums';
import { MessageSocketService } from '../websockets/services/message-socket.service';
import Prisma from '@prisma/client';
import { UserService } from '../user-a/user.service';

@Injectable()
export class MessageService {
    constructor(
        private prismaService: PrismaService,
        private socketService: MessageSocketService,
        private userService: UserService
    ) {
    }

    public async get(
        messageId: string
    ): Promise<Message> {
        const message = await this.prismaService.message.findUnique({
            where: {
                id: messageId
            },
            include: {
                sender: true
            }
        });

        if (message === null) {
            throw new NotFoundException();
        }

        return this.map(message);
    }

    public async delete(
        userId: string,
        messageId: string
    ): Promise<Message> {
        const message = await this.prismaService.message.update({
            where: {
                id: messageId
            },
            data: {
                isDeleted: true
            },
            include: {
                sender: true,
                topicMessage: true
            }
        });

        if (message?.topicMessage === null) {
            throw new NotFoundException();
        }

        const userIdentity = await this.userService.get(userId);

        if (userIdentity.id !== message.senderId
            && userIdentity.role !== RoleType.ADMIN
        ) {
            throw new ForbiddenException('You cannot delete this message.');
        }

        this.socketService.updateMessage(message.id, message.topicMessage.topicId);

        return this.map(message);
    }

    public async add(
        userId: string,
        topicId: string,
        text: string
    ): Promise<Message> {
        const sender = await this.userService.get(userId);

        const message = await this.prismaService.message.create({
            data: {
                messageType: MessageType.Topic,
                senderId: sender.id,
                text: text,
                creationTime: new Date(Date.now()),
                isDeleted: false,
                topicMessage: {
                    create: {
                        topicId: topicId
                    }
                }
            },
            include: {
                sender: true
            }
        });

        this.socketService.addMessage(message.id, topicId);

        return this.map(message);
    }

    private map(message: Prisma.Message & { sender: Prisma.User }): Message {
        return {
            id: message.id,
            text: message.isDeleted ? '' : message.text,
            creationTime: +message.creationTime,
            authorId: message.senderId,
            authorName: message.sender.login,
            isDeleted: message.isDeleted
        };
    }
}