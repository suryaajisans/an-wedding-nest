import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [CommonModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
