import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({
    example: 'dydals3440@gmail.com',
    description:
      '게시글 생성자 이메일 주소가 나옵니다. 단, 탈퇴한 회원의 경우 deleted_로 시작합니다.',
  })
  email: string;

  @ApiProperty({ example: '매튜', description: '작성자 이름' })
  name: string;

  @ApiProperty({
    example: null,
    description: '프로필 이미지 URL (nullable)',
    nullable: true,
  })
  profileImageUrl: string | null;

  @ApiProperty({
    example: 'USER',
    description: '작성자 권한',
    enum: ['USER', 'ADMIN', 'EDITOR'],
  })
  role: string;
}
