import { MessageModel } from '../message/message.model';

export interface TopicDetailsModel {
    id: string;
    name: string;
    authorName: string;
    messages: MessageModel[];
}
