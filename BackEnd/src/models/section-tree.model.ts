import { Section } from '@prisma/client';

export class SectionTree {
    id: number;
    name: string;
    creationTime: Date;
    description: string | null;
    sections: SectionTree[];

    constructor(section: Section, sections: SectionTree[]) {
        this.id = section.id;
        this.name = section.name;
        this.creationTime = section.creationTime;
        this.description = section.description;
        this.sections = sections;
    }


    getSubTree(rootId: number): SectionTree | undefined {

        if (rootId === this.id) {
            return this;
        }

        return this.sections
            .map(s => s.getSubTree(rootId))
            .find(s => s !== undefined);
    }
}
