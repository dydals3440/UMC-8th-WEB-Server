import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentResponseDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '댓글 내용', example: '댓글 내용입니다.' })
  content: string;

  @ApiProperty({
    example: 1,
    description: '댓글 작성자의 고유 ID',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: '게시글 ID',
  })
  lpId: number;

  @ApiProperty({ description: '댓글 생성 시간' })
  createdAt: string;

  @ApiProperty({ description: '댓글 수정 시간' })
  updatedAt: string;
}
