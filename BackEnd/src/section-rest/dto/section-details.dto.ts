import { SectionTree } from '.';
import { Topic } from '@models';

export interface SectionDetails extends SectionTree {
    topics: Topic[];
}