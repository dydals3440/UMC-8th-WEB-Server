import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1, description: '카테고리 ID' })
  id: number;

  @ApiProperty({ example: '인기있는', description: '카테고리 이름' })
  name: string;
}
