import { SectionTree } from './section-tree.model';
import { Section, Topic } from '@prisma/client';
import { TopicInfo } from './topic.model';

export class SectionDetails extends SectionTree {
    topics: TopicInfo[];

    constructor(
        section: Section & { topics: Topic[] },
        sections: SectionTree[]
    ) {
        super(section, sections);
        this.topics = section.topics.map(t => new TopicInfo(t));
    }
}