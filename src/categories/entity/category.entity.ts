import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CategoryEntity {
  @ApiProperty({
    example: 1,
    description: '카테고리의 고유 ID',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '재미있는',
    description: '카테고리의 이름',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2025-02-14T07:48:21.964Z',
    description: '카테고리가 생성된 날짜',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-14T07:48:21.964Z',
    description: '카테고리가 마지막으로 수정된 날짜',
  })
  @IsDate()
  updatedAt: Date;
}
