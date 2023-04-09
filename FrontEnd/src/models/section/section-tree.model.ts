import { SectionModel } from './section.model';

export interface SectionTreeModel extends SectionModel {
    sections: SectionTreeModel[];
}
