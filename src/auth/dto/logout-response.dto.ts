import { ApiProperty } from '@nestjs/swagger';

export class UserLogoutResponse {
  @ApiProperty({ example: 1, description: '사용자의 고유 ID' })
  id: number;
}
