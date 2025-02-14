import { ApiProperty } from '@nestjs/swagger';

export class LpEntity {
  @ApiProperty({
    description: '게시글 고유 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '고구마',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용 또는 설명',
    example: '고구마 아이스크림',
  })
  description: string;

  @ApiProperty({
    description: '작성자(Author)의 고유 ID',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: '카테고리의 고유 ID',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: '생성일자',
    example: '2025-02-14T06:27:46.759Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일자',
    example: '2025-02-14T06:27:46.759Z',
  })
  updatedAt: Date;
}
