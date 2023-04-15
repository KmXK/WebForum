import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { GetCurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    public async add(
        @Body('topicId') topicId: string,
        @Body('text') text: string,
        @GetCurrentUserId() userId: string
    ) {
        return await this.messageService.addMessage(userId, topicId, text);
    }
}
