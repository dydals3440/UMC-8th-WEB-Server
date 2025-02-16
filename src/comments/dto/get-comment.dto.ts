import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/response-user.dto';

export class GetCommentDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '댓글 내용', example: '댓글 내용입니다.' })
  content: string;

  @ApiProperty({ description: '댓글 생성 시간' })
  createdAt: string;

  @ApiProperty({ description: '댓글 수정 시간' })
  updatedAt: string;

  @ApiProperty({
    type: UserResponseDto,
    description: '댓글 작성자 정보',
  })
  user: UserResponseDto;
}
