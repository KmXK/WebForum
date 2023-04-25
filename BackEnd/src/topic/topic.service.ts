import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';

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

    protected mapElement(topic: any) {
        return {
            id: topic.id,
            name: topic.name,
            authorId: topic.authorId
        };
    }
}
