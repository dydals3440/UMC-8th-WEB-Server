import { PartialType } from '@nestjs/swagger';
import { CreateLpDto } from 'src/lps/dto/create-lp.dto';

export class UpdateLpDto extends PartialType(CreateLpDto) {}
