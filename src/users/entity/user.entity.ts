import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: '유저 고유 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '이메일 주소',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: '유저 이름',
    example: '매튜',
  })
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  profileImageUrl?: string;

  @ApiProperty({
    description: '유저 역할',
    example: 'USER',
    enum: ['USER', 'ADMIN', 'EDITOR'],
    default: 'USER',
  })
  role: string;

  @ApiProperty({
    description: '생성일자',
    example: '2021-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일자',
    example: '2021-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
