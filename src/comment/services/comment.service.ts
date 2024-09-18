import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { CommentCreateRequest, CommentResponse } from 'src/models/comment.model';
import { Logger } from 'winston';
import { CommentValidation } from '../comment.validation';

@Injectable()
export class CommentService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private validationService: ValidationService,
        private prismaService: PrismaService
    ) { }

    async createComment(request: CommentCreateRequest): Promise<CommentResponse> {
        this.logger.info(`Create new comment ${JSON.stringify(request)}`)
        const commentRequest: CommentCreateRequest = this.validationService.validate(
            CommentValidation.CREATE,
            request
        );

        // VALIDATION
        // const totalCommentWithSameName = await this.prismaService.comment.count({
        //     where: {
        //         name: this.createComment.name
        //     }
        // })

        // if (totalCommentWithSameName != 0) {
        //     throw new HttpException('Name already exists', 400)
        // }

        const comment = await this.prismaService.comment.create({
            data: commentRequest
        });

        return comment;
    }

    async getComment(): Promise<Array<CommentResponse>> {
        this.logger.info(`Get comments`);
        const comments = await this.prismaService.comment.findMany();

        return comments;
    }

    async deleteComment(id: number): Promise<string> {
        this.logger.info(`Delete comment`)
        await this.prismaService.comment.delete({
            where: {
                id: id
            }
        });

        return `Deleted comment with id ${id}`
    }
}
