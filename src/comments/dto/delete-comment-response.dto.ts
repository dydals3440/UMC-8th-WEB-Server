import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentResponseDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  id: number;
}
