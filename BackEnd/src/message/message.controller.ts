import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { GetCurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {
    }

    @Get(':id')
    public async get(
        @Param('id') messageId: string
    ) {
        return await this.messageService.get(messageId);
    }

    @Delete(':id')
    public async delete(
        @GetCurrentUserId() userId: string,
        @Param('id') messageId: string
    ) {
        return await this.messageService.delete(userId, messageId);
    }

    @Post('')
    public async add(
        @Body('topicId') topicId: string,
        @Body('text') text: string,
        @GetCurrentUserId() userId: string
    ) {
        return await this.messageService.add(userId, topicId, text);
    }
}