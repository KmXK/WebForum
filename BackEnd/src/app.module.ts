import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { SectionModule } from './section';
import { TopicModule } from './topic';
import { MessageModule } from './message';
import { AuthModule } from './auth/auth.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
    imports: [
        CommonModule,
        SectionModule,
        TopicModule,
        MessageModule,
        AuthModule,
        WebsocketsModule,
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
    ]
})
export class AppModule {
}
