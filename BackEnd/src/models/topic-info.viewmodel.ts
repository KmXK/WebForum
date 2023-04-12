import { Topic } from '@prisma/client';

export class TopicInfoViewModel {
    id: string;
    name: string;

    constructor(topic: Topic) {
        this.id = topic.id;
        this.name = topic.name;
    }
}