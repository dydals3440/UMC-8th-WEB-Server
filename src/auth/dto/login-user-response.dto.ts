import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponse {
  @ApiProperty({ example: 4, description: '사용자의 고유 ID' })
  id: number;

  @ApiProperty({ example: '매튜', description: '사용자의 이름' })
  name: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWyMzgwMiwiZXhwIjoxNzM5NTI3NDAyfQ.lIxuqpoAkLvcRPuXTP-TZ2NvtaFsu4wUUxhQX6U6mqRw',
    description: 'Access Token (JWT)',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWMTczOTUyMzgwMiwiZXhwIjoxNzQwMTI4NjAyfQ.5oXPQjy48tO-oewqkuqNVf117IukL05b5KLl_XfXRNY',
    description: 'Refresh Token (JWT)',
  })
  refreshToken: string;

  @ApiProperty({
    example: 'USER',
    description: '사용자의 역할 (USER 또는 ADMIN)',
  })
  role: string;
}
