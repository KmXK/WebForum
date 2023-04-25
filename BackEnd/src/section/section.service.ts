import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';

@Injectable()
export class SectionService extends ServiceBase {
    constructor(
        private prismaService: PrismaService
    ) {
        super();
    }

    public async findAll() {
        return this.map(
            await this.prismaService.section.findMany({})
        );
    }

    public async findOne(
        id: number
    ) {
        return this.map(
            await this.prismaService.section.findUnique({
                where: {
                    id: id
                }
            })
        );
    }

    public async findChildren(sectionId: number) {
        return this.map(
            await this.prismaService.section.findUnique({
                where: {
                    id: sectionId
                }
            }).childSections()
        );
    }

    protected mapElement(section: any) {
        return {
            id: section.id,
            name: section.name,
            creationTime: +section.creationTime,
            description: section.description || undefined
        };
    }
}
