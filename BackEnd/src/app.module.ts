import { Module } from '@nestjs/common';
import { PrismaService } from './services/common/prisma.service';
import { SectionService } from './services/section.service';
import { SectionController } from './controllers/section.controller';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';

@Module({
    providers: [
        PrismaService,
        SectionService,
        TopicService,
        MessageService
    ],
    controllers: [SectionController, TopicController, MessageController]
})
export class AppModule {
}
