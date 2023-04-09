import { Section } from './section.model';

export interface SectionTree extends Section {
    sections: SectionTree[];
}
