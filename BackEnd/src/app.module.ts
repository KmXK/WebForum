import { Module } from '@nestjs/common';
import { PrismaService } from './services/common/prisma.service';
import { SectionService } from './services/section.service';
import { SectionController } from './controllers/section.controller';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';

@Module({
    providers: [
        PrismaService,
        SectionService,
        TopicService
    ],
    controllers: [SectionController, TopicController]
})
export class AppModule {
}
