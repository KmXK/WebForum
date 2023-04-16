import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {
    }

    @Post('')
    public async add(
        @Body('topicId') topicId: string,
        @Body('text') text: string
    ) {
        return await this.messageService.add('', topicId, text);
    }
}