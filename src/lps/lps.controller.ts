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
import { CreateLpDto } from 'src/lps/dto/create-lp.dto';
import { UpdateLpDto } from 'src/lps/dto/update-lp.dto';
import { LpsService } from 'src/lps/lps.service';

@Controller('lps')
export class LpsController {
  constructor(private readonly lpsService: LpsService) {}

  @Post()
  async createLps(@Body() createLpDto: CreateLpDto, @Request() req: any) {
    const userId = req.user.id;
    return await this.lpsService.create(createLpDto, userId);
  }

  @Get()
  async getAllLps(@Query('categoryId', ParseIntPipe) categoryId: number) {
    return await this.lpsService.getAll(categoryId);
  }

  @Get(':id')
  async getLp(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userId = req.user.id;
    return await this.lpsService.getOne(id, userId);
  }

  @Delete(':id')
  async deleteLp(@Param('id', ParseIntPipe) id: number) {
    return await this.lpsService.delete(id);
  }

  @Patch(':id')
  async updateLp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLpDto: UpdateLpDto,
  ) {
    return await this.lpsService.update(id, updateLpDto);
  }
}
