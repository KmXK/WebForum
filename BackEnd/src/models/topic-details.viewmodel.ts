import { MessageViewModel } from './message.viewmodel';

export class TopicDetailsViewModel {
    id: string;
    name: string;
    authorName: string;
    messages: MessageViewModel[];
}
