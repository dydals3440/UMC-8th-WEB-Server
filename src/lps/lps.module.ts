import { Module } from '@nestjs/common';
import { LpsController } from './lps.controller';
import { LpsService } from './lps.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LpsController],
  providers: [LpsService, PrismaService],
})
export class LpsModule {}
