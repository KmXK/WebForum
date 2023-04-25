import { forwardRef, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { PrismaModule } from '@common/prisma';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { SectionModule } from '../section/section.module';

@Module({
    providers: [TopicResolver, TopicService],
    exports: [TopicService],
    imports: [PrismaModule, UserModule, MessageModule, forwardRef(() => SectionModule)]
})
export class TopicModule {
}
