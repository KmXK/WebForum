import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaModule } from '@common/prisma';

@Module({
    imports: [PrismaModule],
    controllers: [SectionController],
    providers: [SectionService]
})
export class SectionModule {
}
