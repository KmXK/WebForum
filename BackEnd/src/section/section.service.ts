import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { ServiceBase } from '@common/ServiceBase';
import { CreateSectionInput } from './dto/create-section.input';
import { RoleType } from '@shared/enums';

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

    async createSection(userId: string, input: CreateSectionInput) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        if (user === null || user.roleId !== RoleType.ADMIN) {
            throw new ForbiddenException('You cannot create section');
        }

        return this.prismaService.section.create({
            data: {
                name: input.name,
                description: input.description,
                authorId: userId,
                parentSectionId: input.parentSectionId,
                creationTime: new Date(Date.now())
            }
        })
    }

    protected mapElement(section: any) {
        return {
            id: section.id,
            name: section.name,
            creationTime: (+section.creationTime).toString(),
            description: section.description || undefined
        };
    }
}
