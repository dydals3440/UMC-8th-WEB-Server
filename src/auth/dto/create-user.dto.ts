import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '유저 이름',
    description: '회원가입 유저 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'dydals3440@gmail.com',
    description: '회원가입 유저 이메일',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'smu123!!',
    description: '회원가입 유저 비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/77136929?v=4',
    description: '프로필 이미지',
  })
  @IsString()
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty({
    enum: ['ADMIN', 'EDITOR', 'USER'],
    description: '유저 권한 (선택) - 기본값: USER',
    default: 'USER',
  })
  @IsString()
  @IsOptional()
  role?: string;
}
