import { MessageModel } from '../models/message/message.model';
import axios from 'axios';

export async function addMessage(topicId: string, text: string): Promise<MessageModel> {
    const response = await axios.post('/api/message', {
        topicId,
        text
    });

    return response.data;
}