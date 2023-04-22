import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { SectionModule } from './section';
import { TopicModule } from './topic';
import { MessageModule } from './message';
import { AuthModule } from './auth/auth.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
    imports: [
        CommonModule,
        SectionModule,
        TopicModule,
        MessageModule,
        AuthModule,
        WebsocketsModule
    ]
})
export class AppModule {
}
