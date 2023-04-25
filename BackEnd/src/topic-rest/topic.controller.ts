import { Controller, Get, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDetailsDto } from './interfaces';

@Controller('topic')
export class TopicController {
    constructor(private topicService: TopicService) {
    }

    @Get(':id')
    getTopic(
        @Param('id') id: string
    ): Promise<TopicDetailsDto> {
        return this.topicService.get(id);
    }
}
