import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class CreateLpDto {
  @ApiProperty({
    example: '게시글 제목',
    description: '생성할 게시글의 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: '이것은 게시글의 설명입니다.',
    description: '게시글에 대한 설명 (선택)',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: '카테고리 ID (필수)',
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
