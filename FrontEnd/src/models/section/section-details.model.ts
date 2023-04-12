import { SectionTreeModel } from './section-tree.model';
import { TopicModel } from '../topic/topic.model';

export interface SectionDetailsModel extends SectionTreeModel {
    topics: TopicModel[];
}