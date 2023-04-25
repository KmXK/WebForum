import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { PrismaModule } from '@common/prisma';
import { WebsocketsModule } from '../websockets/websockets.module';
import { UserModule } from '../user/user.module';

@Module({
    providers: [MessageResolver, MessageService],
    exports: [MessageService],
    imports: [PrismaModule, WebsocketsModule, UserModule]
})
export class MessageModule {
}
