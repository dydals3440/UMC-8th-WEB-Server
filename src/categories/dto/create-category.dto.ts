import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: '카테고리 이름',
    description: '생성할 카테고리의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
