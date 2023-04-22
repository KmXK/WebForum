import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { WebsocketsModule } from '../websockets/websockets.module';

@Module({
    imports: [PrismaModule, WebsocketsModule],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule {
}