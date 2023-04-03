import { Section } from './section.model';

export type SectionTree = Section & {sections: SectionTree[]};
