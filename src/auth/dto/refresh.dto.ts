import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWMTczOTUyMzgwMiwiZXhwIjoxNzQwMTI4NjAyfQ.5oXPQjy48tO-oewqkuqNVf117IukL05b5KLl_XfXRNY',
    description: 'refreshToken',
    required: true,
  })
  refreshToken: string;
}
