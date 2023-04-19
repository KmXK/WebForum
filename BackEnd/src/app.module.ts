import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { SectionModule } from './section';
import { TopicModule } from './topic';
import { MessageModule } from './message';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CommonModule,
        SectionModule,
        TopicModule,
        MessageModule,
        AuthModule
    ]
})
export class AppModule {
}
