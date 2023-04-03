import { SectionTree } from '../../models/section/section-tree.model';
import axios from 'axios';

export async function getAllSectionTrees(): Promise<SectionTree[]> {
    const response = await axios.get('api/section');
    return response.data as SectionTree[];
}
