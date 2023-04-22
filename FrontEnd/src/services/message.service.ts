import { MessageModel } from '../models/message/message.model';
import { api } from '../api';

export async function addMessage(topicId: string, text: string): Promise<MessageModel> {
    const response = await api.post('/api/message', {
        topicId,
        text
    });

    return response.data;
}

export async function getMessage(messageId: string): Promise<MessageModel> {
    const response = await api.get(`/api/message/${ messageId }`);

    return response.data;
}

export async function deleteMessage(messageId: string): Promise<void> {
    await api.delete(`/api/message/${ messageId }`);
}