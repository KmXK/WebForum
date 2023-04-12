import { SectionTreeViewModel } from './section-tree.viewmodel';
import { Section, Topic } from '@prisma/client';
import { TopicInfoViewModel } from './topic-info.viewmodel';

export class SectionDetailsViewModel extends SectionTreeViewModel {
    topics: TopicInfoViewModel[];

    constructor(
        section: Section & { topics: Topic[] },
        sections: SectionTreeViewModel[]
    ) {
        super(section, sections);
        this.topics = section.topics.map(t => new TopicInfoViewModel(t));
    }
}