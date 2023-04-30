import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { MessageSocketService } from '../websockets/services/message-socket.service';
import { UserService } from '../user/user.service';
import { ServiceBase } from '@common/ServiceBase';
import { MessageType, RoleType } from '@shared/enums';
import { CreateMessageInput } from './dto/create-message.input';

@Injectable()
export class MessageService extends ServiceBase {
    constructor(
        private prismaService: PrismaService,
        private socketService: MessageSocketService,
        private userService: UserService
    ) {
        super();
    }

    public async findAll() {
        return this.map(
            await this.prismaService.topicMessage.findMany({
                include: {
                    message: true
                }
            })
        );
    }

    public async findOne(
        id: string
    ) {
        return this.map(
            await this.prismaService.topicMessage.findUnique({
                where: {
                    id_messageType: {
                        id: id,
                        messageType: MessageType.Topic
                    }
                },
                include: {
                    message: true
                }
            })
        );
    }


    public async getTopicMessages(
        topicId: string
    ) {
        return this.map(
            await this.prismaService.topic.findUnique({
                where: {
                    id: topicId
                }
            }).topicMessages({
                include: {
                    message: true
                }
            })
        );
    }

    public async addMessage(
        userId: string,
        createMessageInput: CreateMessageInput
    ) {
        const message = await this.prismaService.topicMessage.create({
            data: {
                topic: {
                    connect: {
                        id: createMessageInput.topicId
                    }
                },
                message: {
                    create: {
                        text: createMessageInput.text,
                        creationTime: new Date(),
                        isDeleted: false,
                        senderId: userId,
                        messageType: MessageType.Topic
                    }
                }
            },
            include: {
                message: true
            }
        });

        this.socketService.addMessage(message.id, message.topicId);

        return this.map(message);
    }

    public async deleteMessage(
        userId: string,
        messageId: string
    ) {
        const message = await this.prismaService.topicMessage.findUnique({
            where: {
                id_messageType: {
                    id: messageId,
                    messageType: MessageType.Topic
                }
            },
            include: {
                message: true
            }
        });

        if (message === null || message.message === null) {
            throw new NotFoundException('Message was not found.');
        }

        const userIdentity = (await this.prismaService.user.findUnique({
            where: {
                id: userId
            },
            include: {
                role: true
            }
        }))!;

        if (userIdentity.id !== message.message.senderId
            && userIdentity.roleId !== RoleType.ADMIN) {
            throw new ForbiddenException('You cannot delete this message.');
        }

        const deletedMessage = await this.prismaService.topicMessage.update({
            where: {
                id_messageType: {
                    id: messageId,
                    messageType: MessageType.Topic
                }
            },
            data: {
                message: {
                    update: {
                        isDeleted: true
                    }
                }
            },
            include: {
                message: true
            }
        });

        console.log(deletedMessage);
        this.socketService.updateMessage(message.id, message.topicId);

        return this.map(deletedMessage);
    }

    protected mapElement(m: any) {
        return {
            id: m.id,
            text: m.message.isDeleted ? '' : m.message.text,
            isDeleted: m.message.isDeleted,
            authorId: m.message.senderId,
            creationTime: (+m.message.creationTime).toString()
        }
    }
}
