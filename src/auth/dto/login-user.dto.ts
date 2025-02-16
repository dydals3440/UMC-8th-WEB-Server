import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'dydals3440@gmail.com',
    description: '사용자의 이메일',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Smu123!!',
    description: '사용자의 비밀번호',
    required: true,
  })
  password: string;
}
