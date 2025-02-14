import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LpsService } from 'src/lps/lps.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, LpsService],
})
export class CommentsModule {}
