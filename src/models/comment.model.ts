export class CommentCreateRequest {
    name: string;
    comment: string;
}

export class CommentResponse {
    id: number;
    name: string;
    comment: string;
}