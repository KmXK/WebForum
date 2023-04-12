import { TopicDetailsModel } from '../models/topic/topic-details.model';
import axios from 'axios';

export async function getTopic(topicId: string): Promise<TopicDetailsModel> {
    const response = await axios.get<TopicDetailsModel>(`/api/topic/${ topicId }`);
    return response.data;
}