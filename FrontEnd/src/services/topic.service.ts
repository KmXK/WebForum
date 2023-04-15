import { TopicDetailsModel } from '../models/topic/topic-details.model';
import { api } from '../api';

export async function getTopic(topicId: string): Promise<TopicDetailsModel> {
    const response = await api.get<TopicDetailsModel>(`/api/topic/${ topicId }`);
    return response.data;
}