import { User } from '../user/user.model';

export interface SectionListItem {
    id: number;
    name: string;
    description?: string;
    author: User;
    children: SectionListItem[];
}