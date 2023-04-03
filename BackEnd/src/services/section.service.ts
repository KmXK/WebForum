import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { Section } from '@prisma/client';
import { SectionTree } from '../models/section-tree.model';

@Injectable()
export class SectionService {
    constructor(private prismaService: PrismaService) {
    }

    public async getAllSectionTrees() {
        const sections = await this.prismaService.section.findMany();
        return this.buildSectionTrees(sections);
    }

    private buildSectionTrees(sections: Section[]): SectionTree[] {
        function group(parentSectionId: number | null): SectionTree[] {
            return sections
                .filter(s => s.parentSectionId == parentSectionId)
                .map(s => ({
                    ...s,
                    sections: group(s.id)
                }));
        }

        return group(null);
    }
}
