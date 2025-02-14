import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateUserAndLp(userId: number, lpId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(
        `${userId}번에 해당하는 유저를 찾을 수 없습니다..`,
      );
    }

    const lp = await this.prisma.lP.findUnique({ where: { id: lpId } });
    if (!lp) {
      throw new NotFoundException(
        `${lpId}번에 해당하는 LP를 찾을 수 없습니다.`,
      );
    }
  }

  async addLike(lpId: number, userId: number) {
    // 1) User, LP가 실제 존재하는지 먼저 확인 (옵션)
    await this.validateUserAndLp(userId, lpId);

    // 2) 이미 좋아요가 있는지 중복 체크 (스키마에 @@unique 없을 때는 이렇게 방지 가능)
    const existingLike = await this.prisma.like.findFirst({
      where: { userId, lpId },
    });
    if (existingLike) {
      // 이미 존재한다면? 예외를 던지거나, 그대로 리턴하는 방식 등 선택
      throw new ConflictException(
        '이미 좋아요 되어 있는 LP입니다. 좋아요를 취소해주세요.',
      );
    }

    // 3) 좋아요 생성
    await this.prisma.like.create({
      data: {
        userId,
        lpId,
      },
    });

    return lpId;
  }

  /**
   * 좋아요 취소
   */
  async removeLike(lpId: number, userId: number) {
    await this.validateUserAndLp(userId, lpId);

    // 1) 좋아요가 있는지 확인
    const like = await this.prisma.like.findFirst({
      where: { userId, lpId },
    });
    if (!like) {
      throw new NotFoundException('좋아요 정보를 찾을 수 없습니다.');
    }

    // 2) 삭제
    await this.prisma.like.delete({
      where: { id: like.id },
    });

    return lpId;
  }

  async getLikes(userId: number) {
    const likes = await this.prisma.like.findMany({
      where: { userId },
      include: { lp: true },
    });

    return likes;
  }
}
