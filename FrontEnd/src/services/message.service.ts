import { MessageModel } from '../models/message/message.model';
import { api } from '../api';

export async function addMessage(topicId: string, text: string): Promise<MessageModel> {
    const response = await api.post('/api/message', {
        topicId,
        text
    });

    return response.data;
}