import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException(
        `[${createCategoryDto.name}] 카테고리가 이미 존재합니다.`,
      );
    }

    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async getAll() {
    return await this.prisma.category.findMany();
  }
}
