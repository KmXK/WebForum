import { SectionTreeModel } from './section-tree.model';
import { Topic } from '../topic/topic.model';

export interface SectionDetailsModel extends SectionTreeModel {
    topics: Topic[];
}