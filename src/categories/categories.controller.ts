import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category-dto';
import { CategoryResponseDto } from 'src/categories/dto/response-category-dto';
import { CategoryEntity } from 'src/categories/entity/category.entity';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: '카테고리 생성',
    description: '새로운 카테고리를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: CategoryEntity,
    description: '카테고리 생성 성공',
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: '카테고리 목록 조회',
    description: '모든 카테고리 목록을 조회합니다.',
  })
  @ApiOkResponse({
    description: '카테고리 목록 조회 성공',
    type: [CategoryResponseDto],
  })
  async getCategories() {
    return await this.categoriesService.getAll();
  }
}
