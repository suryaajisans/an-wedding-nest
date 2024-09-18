import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CommentCreateRequest, CommentResponse } from 'src/models/comment.model';

@Controller('/api/comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get()
    async getComments(): Promise<Array<CommentResponse>> {
        const result = await this.commentService.getComment();
        return result;
    }

    @Post()
    async createComment(@Body() request: CommentCreateRequest): Promise<CommentResponse> {
        const result = await this.commentService.createComment(request);
        return result;
    }

    @Delete('/:id')
    async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const deletedComment = await this.commentService.deleteComment(id);
        return deletedComment;
    }
}
