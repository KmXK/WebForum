import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { WebsocketsModule } from '../websockets/websockets.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [PrismaModule, WebsocketsModule, UserModule],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule {
}