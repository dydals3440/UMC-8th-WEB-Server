import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserSignupResponse
  implements Omit<User, 'password' | 'hashedRefreshToken'>
{
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 'dydals3440@gmail.com' })
  email: string;

  @ApiProperty({ example: '매튜' })
  name: string;

  @ApiProperty({ example: null, nullable: true })
  profileImageUrl: string | null;

  @ApiProperty({
    example: 'USER',
    enum: ['ADMIN', 'EDITOR', 'USER'],
    default: 'USER',
  })
  role: string;

  @ApiProperty({ example: false })
  isDeleted: boolean;

  @ApiProperty({ example: '2025-02-14T08:50:11.249Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-14T08:50:11.249Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;
}
