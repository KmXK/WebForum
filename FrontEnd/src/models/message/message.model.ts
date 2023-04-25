export interface MessageModel {
    id: string;
    authorId: string;
    authorName: string;
    text: string;
    creationTime: number;
    isDeleted: boolean;
}
