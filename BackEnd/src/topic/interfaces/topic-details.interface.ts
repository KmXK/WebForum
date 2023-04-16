import { Message } from '@models';

export interface TopicDetails {
    id: string;
    name: string;
    authorName: string;
    messages: Message[];
}