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
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

@ApiTags('bookmarks')
@ApiBearerAuth()
@Controller('lps/:lpId/bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async createBookmark(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.bookmarksService.addBookmark(lpId, userId);
  }

  @Delete()
  async deleteBookmark(
    @Param('lpId', new ParseIntPipe()) lpId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return await this.bookmarksService.removeBookmark(lpId, userId);
  }

  @Get()
  async getBookmarks(@Request() req: any) {
    const userId = req.user.id;

    return await this.bookmarksService.getBookmarks(userId);
  }
}
