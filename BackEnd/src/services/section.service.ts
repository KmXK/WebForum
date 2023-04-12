import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { Section } from '@prisma/client';
import { SectionTreeViewModel } from '../models/section-tree.viewmodel';
import { SectionDetailsViewModel } from '../models/section-details.viewmodel';

@Injectable()
export class SectionService {
    constructor(private prismaService: PrismaService) {
    }

    public async getAllSectionTrees(): Promise<SectionTreeViewModel[]> {
        const sections = await this.prismaService.section.findMany();
        return this.buildSectionTrees(sections);
    }

    public async getSection(id: number): Promise<SectionDetailsViewModel> {
        const section = await this.prismaService
            .section
            .findUnique({
                where: {
                    id
                },
                include: {
                    topics: true
                }
            });

        if (section === null) {
            throw 'Invalid section\'s id';
        }

        const trees = await this.getAllSectionTrees();

        const subTree = trees
            .map(t => t.getSubTree(section.id))
            .find(t => t !== undefined)!;

        return new SectionDetailsViewModel(section, subTree.sections);
    }

    private buildSectionTrees(sections: Section[]): SectionTreeViewModel[] {
        function group(parentSectionId: number | null): SectionTreeViewModel[] {
            return sections
                .filter(s => s.parentSectionId === parentSectionId)
                .map(s => new SectionTreeViewModel(s, group(s.id)));
        }

        return group(null);
    }
}
