import { User } from '../user/user.model';

export interface MessageModel {
    id: string;
    author: User;
    text: string;
    creationTime: string;
    isDeleted: boolean;
}
