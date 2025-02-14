import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

@Controller('lps/:lpId/bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async createBookmark(
    @Param('lpId', new ParseIntPipe()) lpId: number,
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
