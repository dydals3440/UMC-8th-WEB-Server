import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLpDto } from 'src/lps/dto/create-lp.dto';
import { LpResponseDto } from 'src/lps/dto/response-lps.dto';
import { UpdateLpDto } from 'src/lps/dto/update-lp.dto';
import { LpEntity } from 'src/lps/entity/lp.entity';
import { LpsService } from 'src/lps/lps.service';

@ApiTags('lps')
@ApiBearerAuth()
@Controller('lps')
export class LpsController {
  constructor(private readonly lpsService: LpsService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 생성',
    description: '새로운 LP 상세 게시글을 생성합니다.',
  })
  @ApiCreatedResponse({
    type: LpEntity,
    description: 'LP 상세 게시글 생성 성공',
  })
  async createLps(@Body() createLpDto: CreateLpDto, @Request() req: any) {
    const userId = req.user.id;
    return await this.lpsService.create(createLpDto, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: 'LP 상세 게시글을 수정합니다.',
  })
  @ApiCreatedResponse({
    type: LpEntity,
    description: 'LP 상세 수정 성공',
  })
  async updateLp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLpDto: UpdateLpDto,
  ) {
    return await this.lpsService.update(id, updateLpDto);
  }

  @Get()
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: Number,
    description: '카테고리를 생성한 후, 반환된 카테고리 ID를 활용해주세요.',
  })
  @ApiOperation({
    summary: '게시글 전체 조회',
    description: 'LP 전체 조회합니다.',
  })
  @ApiOkResponse({
    type: [LpResponseDto],
    description: 'LP 전체 조회 성공',
  })
  async getAllLps(@Query('categoryId', ParseIntPipe) categoryId: number) {
    return await this.lpsService.getAll(categoryId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: '특정 LP 상세 게시글 ID',
  })
  @ApiOperation({
    summary: '게시글 상세 조회',
    description: '특정 LP 상세 게시글을 조회합니다.',
  })
  @ApiOkResponse({
    type: LpResponseDto,
    description: 'LP 상세 조회 성공',
  })
  async getLp(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userId = req.user.id;
    return await this.lpsService.getOne(id, userId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: '특정 LP 상세 게시글 ID',
  })
  @ApiOperation({
    summary: '게시글 삭제',
    description: '특정 LP 상세 게시글을 삭제합니다.',
  })
  @ApiOkResponse({
    description: 'LP 상세 삭제 성공',
  })
  async deleteLp(@Param('id', ParseIntPipe) id: number) {
    return await this.lpsService.delete(id);
  }
}
