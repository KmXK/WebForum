import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {
    }

    @Post('')
    public async add(
        @Body('topicId') topicId: string,
        @Body('text') text: string
    ) {
        return await this.messageService.addMessage(topicId, text);
    }
}
