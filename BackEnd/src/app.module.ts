import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SectionModule } from './section/section.module';
import { TopicModule } from './topic/topic.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
    imports: [
        CommonModule,
        SectionModule,
        TopicModule,
        MessageModule,
        AuthModule,
        WebsocketsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: process.cwd() + '/src/schema.gql'
        }),
        UserModule,
        RoleModule,
    ]
})
export class AppModule {
}
