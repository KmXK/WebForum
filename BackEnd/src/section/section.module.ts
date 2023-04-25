import { forwardRef, Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { PrismaModule } from '@common/prisma';
import { TopicModule } from '../topic/topic.module';

@Module({
    providers: [SectionResolver, SectionService],
    imports: [PrismaModule, forwardRef(() => TopicModule)]
})
export class SectionModule {
}
