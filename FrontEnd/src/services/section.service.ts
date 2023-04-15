import { SectionTreeModel } from '../models/section/section-tree.model';
import { SectionDetailsModel } from '../models/section/section-details.model';
import { api } from '../api';

export async function getAllSectionTrees(): Promise<SectionTreeModel[]> {
    const response = await api.get<SectionTreeModel[]>('/api/section');
    return response.data;
}

export async function getSection(id: string): Promise<SectionDetailsModel> {
    const response = await api.get<SectionDetailsModel>(`/api/section/${ id }`);
    return response.data;
}

