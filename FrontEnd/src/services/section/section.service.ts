import { SectionTreeModel } from '../../models/section/section-tree.model';
import axios from 'axios';
import { SectionDetailsModel } from '../../models/section/section-details.model';

export async function getAllSectionTrees(): Promise<SectionTreeModel[]> {
    const response = await axios.get('/api/section');
    return response.data as SectionTreeModel[];
}

export async function getSection(id: string): Promise<SectionDetailsModel> {
    const response = await axios.get(`/api/section/${ id }`);
    return response.data as SectionDetailsModel;
}

