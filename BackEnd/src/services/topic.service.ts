import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { TopicDetailsViewModel } from '../models/topic-details.model';

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
                authorName: m.message.sender.firstName + ' ' + m.message.sender.lastName,
                text: m.message.text,
                creationTime: m.message.creationTime
            }))
        }
    }
}
