import { Controller, Get, Param } from '@nestjs/common';
import { TopicService } from '../services/topic.service';

@Controller('topic')
export class TopicController {
    constructor(private topicService: TopicService) {
    }

    @Get(':id')
    getTopic(
        @Param('id') id: string
    ) {
        return this.topicService.getTopic(id);
    }
}