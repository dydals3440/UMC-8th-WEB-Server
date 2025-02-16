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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginResponse } from 'src/auth/dto/login-user-response.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { RefreshDto } from 'src/auth/dto/refresh.dto';
import { UserLogoutResponse } from 'src/auth/dto/logout-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: '회원가입',
    description:
      '새로운 사용자를 등록합니다. role을 body에 전달하지 않을 때 기본 권한은 USER 입니다. profileImageUrl은 넘겨도, 안넘겨도 됩니다.',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: '로그인',
    description: 'email, password를 통해 로그인을 진행합니다.',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiCreatedResponse({ type: UserLoginResponse, description: '성공' })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req: any) {
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
  @ApiBody({
    type: RefreshDto,
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
      `http://localhost:5173/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 진행합니다.',
  })
  @ApiCreatedResponse({
    description: '로그아웃 성공',
    type: UserLogoutResponse,
  })
  @Post('signout')
  @ApiBearerAuth()
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user.id);
  }
}
