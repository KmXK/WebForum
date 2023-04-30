import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';
import { CreateTopicInput } from './dto/create-topic.input';
import { MessageType } from '@shared/enums';

@Injectable()
export class TopicService extends ServiceBase {
    constructor(
        private prismaService: PrismaService
    ) {
        super();
    }

    async findAll() {
        return this.map(
            await this.prismaService.topic.findMany({})
        );
    }

    async findOne(id: string) {
        return this.map(
            await this.prismaService.topic.findUnique({
                where: {
                    id: id
                }
            })
        );
    }

    async findBySection(sectionId: number) {
        return this.map(
            await this.prismaService.section.findUnique({
                where: {
                    id: sectionId
                }
            }).topics()
        );
    }

    async createTopic(userId: string, createTopicInput: CreateTopicInput) {
        return this.map(
            await this.prismaService.topic.create({
                data: {
                    name: createTopicInput.name,
                    sectionId: createTopicInput.sectionId,
                    authorId: userId,
                    isImportant: createTopicInput.isImportant,
                    creationTime: new Date(),
                    topicMessages: {
                        create: {
                            message: {
                                create: {
                                    senderId: userId,
                                    text: createTopicInput.messageText,
                                    messageType: MessageType.Topic,
                                    creationTime: new Date()
                                }
                            }
                        }
                    }
                },
            })
        );
    }

    protected mapElement(topic: any) {
        return {
            id: topic.id,
            name: topic.name,
            authorId: topic.authorId,
            creationTime: topic.creationTime
        };
    }
}
