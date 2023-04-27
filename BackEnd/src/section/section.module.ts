import { forwardRef, Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { PrismaModule } from '@common/prisma';
import { TopicModule } from '../topic/topic.module';
import { UserModule } from '../user/user.module';

@Module({
    providers: [SectionResolver, SectionService],
    imports: [PrismaModule, forwardRef(() => TopicModule), UserModule]
})
export class SectionModule {
}
