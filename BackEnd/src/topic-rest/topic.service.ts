import { PrismaService } from '@common/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicDetailsDto } from './interfaces';

@Injectable()
export class TopicService {
    constructor(private prismaService: PrismaService) {
    }

    public async get(id: string): Promise<TopicDetailsDto> {
        const topic = await this.prismaService.topic
            .findUnique({
                where: {id},
                include: {
                    author: true,
                    topicMessages: {
                        include: {
                            message: {
                                include: {
                                    sender: true
                                }
                            }
                        },
                        orderBy: {
                            message: {
                                creationTime: 'asc'
                            }
                        }
                    }
                }
            });

        if (!topic) {
            throw new NotFoundException();
        }

        return {
            id: topic.id,
            name: topic.name,
            authorName: topic.author.login,
            messages: topic.topicMessages.map(m => ({
                id: m.message.id,
                authorId: m.message.senderId,
                authorName: m.message.sender.login,
                text: m.message.text,
                creationTime: +m.message.creationTime,
                isDeleted: m.message.isDeleted
            }))
        };
    }
}
