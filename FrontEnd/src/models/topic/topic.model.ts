import { User } from '../user/user.model';

export interface Topic {
    id: string;
    name: string;
    author: User;

    creationTime: string;
}