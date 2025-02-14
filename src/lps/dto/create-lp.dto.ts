import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class CreateLpDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
