import { PrismaService } from '@common/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '@models';
import { MessageType } from '@shared/enums';

@Injectable()
export class MessageService {
    constructor(private prismaService: PrismaService) {
    }

    public async add(
        userId: string,
        topicId: string,
        text: string
    ): Promise<Message> {
        const sender = await this.prismaService.user.findUnique({
            where: {
                //id: userId
                login: 'admin'
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

        return {
            id: message.id,
            text: message.text,
            creationTime: +message.creationTime,
            authorName: sender.login
        };
    }
}