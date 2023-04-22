import { Module } from '@nestjs/common';
import { TopicGateway } from './topic.gateway';
import { MessageSocketService } from './services/message-socket.service';

@Module({
    providers: [TopicGateway, MessageSocketService],
    exports: [MessageSocketService]
})
export class WebsocketsModule {
}