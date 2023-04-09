import { SectionTree } from './section-tree.model';
import { Section, Topic } from '@prisma/client';

export class SectionDetails extends SectionTree {
    topics: Topic[];

    constructor(
        section: Section & { topics: Topic[] },
        sections: SectionTree[]
    ) {
        super(section, sections);
        this.topics = section.topics;
    }
}