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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { DeleteCommentResponseDto } from 'src/comments/dto/delete-comment-response.dto';
import { GetCommentDto } from 'src/comments/dto/get-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
import { UpdateCommentResponseDto } from 'src/comments/dto/update-comment-response.dto';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('lps/:lpId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 생성',
    description: '특정 LP 게시글에 댓글을 생성합니다.',
  })
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
  @ApiOperation({
    summary: '댓글 조회',
    description: '특정 LP 게시글에 달린 댓글을 조회합니다.',
  })
  @ApiResponse({
    type: GetCommentDto,
  })
  async getComment(@Param('lpId', ParseIntPipe) lpId: number) {
    return await this.commentsService.getComments(lpId);
  }

  @Delete(':commentId')
  @ApiOperation({
    summary: '댓글 삭제',
    description: '특정 댓글을 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
    type: DeleteCommentResponseDto,
  })
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.commentsService.deleteComment(commentId, userId);
  }

  @Put(':commentId')
  @ApiOperation({
    summary: '댓글 수정',
    description: '특정 댓글을 수정합니다.',
  })
  @ApiResponse({
    type: UpdateCommentResponseDto,
  })
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
