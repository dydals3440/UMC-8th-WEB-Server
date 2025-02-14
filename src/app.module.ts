import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { LpsModule } from './lps/lps.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LpsModule,
    CategoriesModule,
    CommentsModule,
    BookmarksModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
