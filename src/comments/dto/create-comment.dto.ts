import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '댓글 내용',
    description: '생성할 댓글의 내용',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
