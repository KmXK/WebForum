import { User } from '../user/user.model';

export interface SectionListItem {
    id: number;
    name: string;
    description?: string | null;
    author: User;
    children: SectionListItem[];
}