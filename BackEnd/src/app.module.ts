import { Module } from '@nestjs/common';
import { PrismaService } from './services/common/prisma.service';
import { SectionService } from './services/section.service';
import { SectionController } from './controllers/section.controller';

@Module({
    providers: [
        PrismaService,
        SectionService
    ],
    controllers: [SectionController]
})
export class AppModule {
}
