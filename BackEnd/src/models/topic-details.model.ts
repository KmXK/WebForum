import { Message } from './message.model';

export class TopicDetails {
    id: string;
    name: string;
    authorName: string;
    messages: Message[];
}
