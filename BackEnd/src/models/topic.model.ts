import { Topic } from '@prisma/client';

export class TopicInfo {
    id: string;
    name: string;

    constructor(topic: Topic) {
        this.id = topic.id;
        this.name = topic.name;
    }
}