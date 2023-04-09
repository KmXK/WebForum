import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { Section } from '@prisma/client';
import { SectionTree } from '../models/section-tree.model';
import { SectionDetails } from '../models/section-details.model';

@Injectable()
export class SectionService {
    constructor(private prismaService: PrismaService) {
    }

    public async getAllSectionTrees(): Promise<SectionTree[]> {
        const sections = await this.prismaService.section.findMany();
        return this.buildSectionTrees(sections);
    }

    public async getSection(id: number): Promise<SectionDetails> {
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

        return new SectionDetails(section, subTree.sections);
    }

    private buildSectionTrees(sections: Section[]): SectionTree[] {
        function group(parentSectionId: number | null): SectionTree[] {
            return sections
                .filter(s => s.parentSectionId === parentSectionId)
                .map(s => new SectionTree(s, group(s.id)));
        }

        return group(null);
    }
}
