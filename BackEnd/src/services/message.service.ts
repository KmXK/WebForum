import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { MessageTypeModel } from '../../prisma/models/messageType.model';
import { MessageViewModel } from '../models/message.viewmodel';

@Injectable()
export class MessageService {
    constructor(private prismaService: PrismaService) {
    }

    public async addMessage(userId: string, topicId: string, text: string): Promise<MessageViewModel> {
        const sender = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        console.log(sender)

        if (sender == null) {
            throw new NotFoundException('Invalid user');
        }

        const message = await this.prismaService.message.create({
            data: {
                messageType: MessageTypeModel.Topic,
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
