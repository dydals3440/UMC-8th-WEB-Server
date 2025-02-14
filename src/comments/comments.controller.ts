import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  Body,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment-dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment-dto';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('lps/:lpId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Param('lpId', new ParseIntPipe()) lpId: number,
    @Request() req: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user.id;

    return await this.commentsService.addComment(
      lpId,
      userId,
      createCommentDto,
    );
  }

  @Get()
  async getComment(@Param('lpId', ParseIntPipe) lpId: number) {
    return await this.commentsService.getComments(lpId);
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.commentsService.deleteComment(commentId, userId);
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Request() req: any,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = req.user.id;

    return await this.commentsService.updateComment(
      commentId,
      userId,
      updateCommentDto,
    );
  }
}
