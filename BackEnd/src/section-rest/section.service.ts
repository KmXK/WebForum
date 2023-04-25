import { Injectable } from '@nestjs/common';
import { SectionDetails, SectionTree } from './dto';
import { Section } from '@prisma/client';
import { PrismaService } from '@common/prisma';

@Injectable()
export class SectionService {
    constructor(private prismaService: PrismaService) {
    }

    public async all(): Promise<SectionTree[]> {
        const sections = await this.prismaService.section.findMany();
        return this.buildSectionTrees(sections);
    }

    public async get(id: number): Promise<SectionDetails> {
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

        const trees = await this.all();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const subTree = trees
            .map(t => this.getSubTree(t, section.id))
            .find(t => t !== undefined)!;

        return {
            ...subTree,
            topics: section.topics.map(t => ({
                id: t.id,
                name: t.name
            }))
        };
    }

    private buildSectionTrees(sections: Section[]): SectionTree[] {
        function group(parentSectionId: number | null): SectionTree[] {
            return sections
                .filter(s => s.parentSectionId === parentSectionId)
                .map(s => ({
                    id: s.id,
                    name: s.name,
                    creationTime: s.creationTime,
                    description: s.description,
                    sections: group(s.id)
                }));
        }

        return group(null);
    }

    private getSubTree(tree: SectionTree, rootId: number): SectionTree | undefined {
        if (rootId === tree.id) {
            return tree;
        }

        return tree.sections
            .map(s => this.getSubTree(s, rootId))
            .find(s => s !== undefined);
    }
}
