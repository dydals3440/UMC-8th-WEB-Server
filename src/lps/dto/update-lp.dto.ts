import { PartialType } from '@nestjs/mapped-types';
import { CreateLpDto } from 'src/lps/dto/create-lp.dto';

export class UpdateLpDto extends PartialType(CreateLpDto) {}
