import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
    imports: [PrismaModule],
    controllers: [TopicController],
    providers: [TopicService]
})
export class TopicModule {
}