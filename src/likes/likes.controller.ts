import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikesService } from 'src/likes/likes.service';

@ApiTags('likes')
@ApiBearerAuth()
@Controller('lps/:lpId/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async createLike(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.likesService.addLike(lpId, userId);
  }

  @Delete()
  async deleteLike(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.likesService.removeLike(lpId, userId);
  }

  @Get()
  async getLikes(@Request() req: any) {
    const userId = req.user.id;

    return await this.likesService.getLikes(userId);
  }
}
