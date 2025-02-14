import { ApiProperty } from '@nestjs/swagger';

export class BookmarkResponseDto {
  @ApiProperty({ example: 1, description: '북마크한 사용자 ID' })
  userId: number;
}
