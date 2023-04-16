import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { SectionModule } from './section';
import { TopicModule } from './topic';
import { MessageModule } from './message';

@Module({
    imports: [
        CommonModule,
        SectionModule,
        TopicModule,
        MessageModule
    ]
})
export class AppModule {
}
