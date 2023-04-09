import { SectionTree } from './section-tree.model';
import { Topic } from './topic.model';

export interface SectionDetails extends SectionTree {
    topics: Topic[];
}