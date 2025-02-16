import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
