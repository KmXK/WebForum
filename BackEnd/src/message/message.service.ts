import { PrismaService } from '@common/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '@models';
import { MessageType } from '@shared/enums';
import { MessageSocketService } from '../websockets/services/message-socket.service';

@Injectable()
export class MessageService {
    constructor(
        private prismaService: PrismaService,
        private socketService: MessageSocketService
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

        return {
            id: message.id,
            text: message.text,
            creationTime: +message.creationTime,
            authorName: message.sender.login
        };
    }

    public async delete(
        messageId: string
    ): Promise<void> {

        const result = await this.prismaService.message.findUnique({
            where: {
                id: messageId
            },
            select: {
                messageType: true
            }
        });

        if (result === null) {
            throw new NotFoundException();
        }

        const {messageType} = result;

        await this.prismaService.$transaction([
            messageType === MessageType.Topic
                ? this.prismaService.topicMessage.delete({
                    where: {
                        id_messageType: {
                            id: messageId,
                            messageType: messageType
                        }
                    }
                })
                : this.prismaService.directMessage.delete({
                    where: {
                        id_messageType: {
                            id: messageId,
                            messageType: messageType
                        }
                    }
                }),
            this.prismaService.message.delete({
                where: {
                    id: messageId
                }
            })
        ]);
    }

    public async add(
        userId: string,
        topicId: string,
        text: string
    ): Promise<Message> {
        const sender = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        if (sender == null) {
            throw new NotFoundException('User with specified id was not found');
        }

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
            }
        });

        this.socketService.addMessage(message.id, topicId);

        return {
            id: message.id,
            text: message.text,
            creationTime: +message.creationTime,
            authorName: sender.login
        };
    }
}