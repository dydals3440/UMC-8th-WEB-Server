import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';

import { RefreshAuthGuard } from 'src/auth/guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: '로그인',
    description: '로그인을 진행합니다.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @ApiOperation({
    summary: 'RBAC 테스트',
    description: 'RBAC 테스트를 위한 API 입니다.',
  })
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth()
  @Get('protected')
  getAll(@Request() req) {
    return `Now you can access this protected API, ${req.user.id}`;
  }

  @ApiOperation({
    summary: '토큰 재발급',
    description: 'body에 refreshToken을 제공하면, Access Token을 재발급합니다.',
  })
  @Public()
  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @ApiOperation({
    summary: '구글 로그인',
    description: '구글 로그인을 진행합니다.',
  })
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @ApiOperation({
    summary: '구글 로그인 콜백',
    description: '구글 로그인 콜백을 진행합니다.',
  })
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req: any, @Res() res: any) {
    const response = await this.authService.login(req.user.id, req.user.name);
    res.redirect(
      `http://localhost:8ㅓㅗ호ㅛㅛㅓㅜ76000/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 진행합니다.',
  })
  @Post('signout')
  @ApiBearerAuth()
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user.id);
  }
}
