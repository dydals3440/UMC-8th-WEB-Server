import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLpDto } from 'src/lps/dto/create-lp.dto';
import { UpdateLpDto } from 'src/lps/dto/update-lp.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LpsService {
  constructor(private readonly prisma: PrismaService) {}

  async checkCategoryIdInBody(categoryId: number) {
    if (!categoryId) {
      throw new BadRequestException('categoryId 값이 필요합니다.');
    }
  }

  async checkCategoryExist(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `${categoryId}에 해당하는 카테고리를 찾을 수 없습니다.`,
      );
    }
  }

  async create(createLpDto: CreateLpDto, userId: number) {
    // 1. categoryId가 없는 경우 → 잘못된 요청
    await this.checkCategoryIdInBody(createLpDto.categoryId);

    // 2. categoryId가 존재하는지 DB에서 확인
    await this.checkCategoryExist(createLpDto.categoryId);

    return this.prisma.lP.create({
      data: {
        title: createLpDto.title,
        description: createLpDto.description,
        author: {
          connect: { id: userId },
        },
        category: {
          connect: { id: createLpDto.categoryId },
        },
      },
    });
  }

  async getAll(categoryId?: number) {
    return await this.prisma.lP.findMany({
      where: categoryId ? { categoryId } : {},
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            profileImageUrl: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async checkLpExist(id: number) {
    const lp = await this.prisma.lP.findUnique({
      where: {
        id,
      },
    });

    if (!lp) {
      throw new NotFoundException(`${id}에 해당하는 LP를 찾을 수 없습니다.`);
    }
  }

  async getOne(id: number, userId: number) {
    await this.checkLpExist(id);

    const lp = await this.prisma.lP.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            profileImageUrl: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
          },
        },
      },
    });

    const totalLikes = lp.likes.length;
    const totalBookmarks = lp.bookmarks.length;
    const isLiked = lp.likes.some((like) => like.userId === userId);
    const isBookmarked = lp.bookmarks.some(
      (bookmark) => bookmark.userId === userId,
    );

    return {
      ...lp,
      totalLikes,
      totalBookmarks,
      isLiked,
      isBookmarked,
    };
  }

  async delete(id: number) {
    await this.checkLpExist(id);

    await this.prisma.lP.delete({
      where: {
        id,
      },
    });

    return id;
  }

  async update(id: number, updateLpDto: UpdateLpDto) {
    // 1. categoryId가 없는 경우 → 잘못된 요청
    await this.checkCategoryIdInBody(updateLpDto.categoryId);

    // 2. LP가 존재하는지 DB에서 확인
    await this.checkLpExist(id);

    // 3. categoryId가 존재하는지 DB에서 확인
    await this.checkCategoryExist(updateLpDto.categoryId);

    await this.prisma.lP.update({
      where: {
        id,
      },
      data: {
        ...updateLpDto,
      },
    });

    const lp = await this.prisma.lP.findUnique({
      where: {
        id,
      },
    });

    return lp;
  }
}
