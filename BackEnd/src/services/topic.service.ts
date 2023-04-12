import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { TopicDetailsViewModel } from '../models/topic-details.viewmodel';

@Injectable()
export class TopicService {
    constructor(private prismaService: PrismaService) {
    }

    public async getTopic(id: string): Promise<TopicDetailsViewModel> {
        const topic = await this.prismaService.topic
            .findUnique({
                where: {id},
                include: {
                    topicMessages: {
                        include: {
                            message: {
                                include: {
                                    topicMessage: true,
                                    sender: true
                                }
                            }
                        },
                        orderBy: {
                            message: {
                                creationTime: 'asc'
                            }
                        }
                    },
                    author: true
                }
            });

        if (!topic) {
            throw new NotFoundException();
        }

        return {
            id: topic.id,
            name: topic.name,
            authorName: topic.author.firstName + ' ' + topic.author.lastName,
            messages: topic.topicMessages.map(m => ({
                id: m.message.id,
                authorName: m.message.sender.login,
                text: m.message.text,
                creationTime: +m.message.creationTime
            }))

        }
    }
}
