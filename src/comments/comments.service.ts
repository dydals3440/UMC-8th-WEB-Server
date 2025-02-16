import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
import { LpsService } from 'src/lps/lps.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lpsService: LpsService,
  ) {}

  private async validateCommentOwnership(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }

    if (comment.userId !== userId) {
      throw new NotFoundException('해당 댓글을 수정할 권한이 없습니다.');
    }

    return comment;
  }

  async addComment(
    lpId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    await this.lpsService.checkLpExist(lpId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    const lp = await this.prisma.lP.findUnique({
      where: {
        id: lpId,
      },
    });

    if (!lp) {
      throw new NotFoundException('해당 LP를 찾을 수 없습니다.');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content, // 댓글 내용
        userId, // 댓글을 작성한 사용자 ID
        lpId, // 해당 LP의 ID
      },
    });

    return comment;
  }

  async getComments(lpId: number) {
    await this.lpsService.checkLpExist(lpId);

    const comments = await this.prisma.comment.findMany({
      where: {
        lpId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            profileImageUrl: true,
            role: true,
            isDeleted: true,
          },
        },
      },
    });

    return comments;
  }

  async deleteComment(commentId: number, userId: number) {
    await this.validateCommentOwnership(commentId, userId);

    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {
      id: commentId,
    };
  }

  async updateComment(
    commentId: number,
    userId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    await this.validateCommentOwnership(commentId, userId);

    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: updateCommentDto.content,
      },
    });

    const updateComment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    return updateComment;
  }
}
