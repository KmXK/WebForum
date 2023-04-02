import { Module } from '@nestjs/common';
import { SectionService } from './services/section.service';
import { PrismaService } from './services/base/prisma.service';
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
