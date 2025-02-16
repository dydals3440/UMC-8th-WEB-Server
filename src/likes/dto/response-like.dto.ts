import { ApiProperty } from '@nestjs/swagger';

export class LikeResponseDto {
  @ApiProperty({ example: 1, description: '좋아요한 사용자 ID' })
  userId: number;
}
