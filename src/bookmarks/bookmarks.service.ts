import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
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

  async addBookmark(lpId: number, userId: number) {
    // 1) User, LP가 실제 존재하는지 먼저 확인 (옵션)
    await this.validateUserAndLp(userId, lpId);

    // 2) 이미 북마크가 있는지 중복 체크 (스키마에 @@unique 없을 때는 이렇게 방지 가능)
    const existingBookmark = await this.prisma.bookmark.findFirst({
      where: { userId, lpId },
    });
    if (existingBookmark) {
      // 이미 존재한다면? 예외를 던지거나, 그대로 리턴하는 방식 등 선택
      throw new ConflictException(
        '이미 북마크 되어 있는 LP입니다. 북마크를 취소해주세요.',
      );
    }

    // 3) 북마크 생성
    await this.prisma.bookmark.create({
      data: {
        userId,
        lpId,
      },
    });

    return lpId;
  }

  /**
   * 북마크 취소
   */
  async removeBookmark(lpId: number, userId: number) {
    await this.validateUserAndLp(userId, lpId);

    // 1) 북마크가 있는지 확인
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { userId, lpId },
    });
    if (!bookmark) {
      throw new NotFoundException('북마크 정보를 찾을 수 없습니다.');
    }

    // 2) 삭제
    await this.prisma.bookmark.delete({
      where: { id: bookmark.id },
    });

    return lpId;
  }

  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId },
      include: { lp: true },
    });

    return bookmarks;
  }
}
