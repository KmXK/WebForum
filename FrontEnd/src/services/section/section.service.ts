import { SectionTree } from '../../models/section/section-tree.model';
import axios from 'axios';
import { SectionDetails } from '../../models/section/section-details.model';

export async function getAllSectionTrees(): Promise<SectionTree[]> {
    const response = await axios.get('/api/section');
    return response.data as SectionTree[];
}

export async function getSection(id: string): Promise<SectionDetails> {
    const response = await axios.get(`/api/section/${ id }`);
    return response.data as SectionDetails;
}

