import { Injectable } from '@nestjs/common';
import { TopicGateway } from '../topic.gateway';

@Injectable()
export class MessageSocketService {
    constructor(private topicGateway: TopicGateway) {
    }

    addMessage(messageId: string, topicId: string) {
        this.topicGateway.addMessage({
            topicId,
            messageId
        });
    }
}