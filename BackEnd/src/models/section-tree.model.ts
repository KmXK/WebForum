import { Section } from '@prisma/client';

export type SectionTree = Section & {sections: SectionTree[]};
