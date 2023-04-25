export interface Message {
    id: string;
    authorId: string;
    authorName: string;
    text: string;
    creationTime: number;
    isDeleted: boolean;
}
