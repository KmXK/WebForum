import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { MessageSocketService } from '../websockets/services/message-socket.service';
import { UserService } from '../user/user.service';
import { ServiceBase } from '@common/ServiceBase';
import { MessageType } from '@shared/enums';

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

    protected mapElement(m: any) {
        return {
            id: m.id,
            text: m.message.text,
            isDeleted: m.message.isDeleted,
            authorId: m.message.senderId,
            creationTime: +m.message.creationTime
        }
    }
}
