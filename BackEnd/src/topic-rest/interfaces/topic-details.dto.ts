import { Message } from '@models';

export interface TopicDetailsDto {
    id: string;
    name: string;
    authorName: string;
    messages: Message[];
}
