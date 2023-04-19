import { Section } from '@shared/interfaces';

export interface SectionTree extends Section {
    sections: SectionTree[];
}
