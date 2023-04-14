import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from './services/common/prisma.service';
import { SectionService } from './services/section.service';
import { SectionController } from './controllers/section.controller';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './services/user.service';

@Module({
    providers: [
        PrismaService,
        SectionService,
        TopicService,
        MessageService,
        UserService
    ],
    exports: [
        UserService
    ],
    imports: [forwardRef(() => AuthModule)],
    controllers: [SectionController, TopicController, MessageController]
})
export class AppModule {
}
