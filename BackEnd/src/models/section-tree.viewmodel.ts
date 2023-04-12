import { Section } from '@prisma/client';

export class SectionTreeViewModel {
    id: number;
    name: string;
    creationTime: Date;
    description: string | null;
    sections: SectionTreeViewModel[];

    constructor(section: Section, sections: SectionTreeViewModel[]) {
        this.id = section.id;
        this.name = section.name;
        this.creationTime = section.creationTime;
        this.description = section.description;
        this.sections = sections;
    }


    getSubTree(rootId: number): SectionTreeViewModel | undefined {

        if (rootId === this.id) {
            return this;
        }

        return this.sections
            .map(s => s.getSubTree(rootId))
            .find(s => s !== undefined);
    }
}
