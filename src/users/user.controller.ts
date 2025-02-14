import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserService } from 'src/users/user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: '내 정보 조회',
    description: 'accessToken을 활용하여, 나의 정보를 조회합니다.',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: '사용자 정보 조회 성공',
  })
  async getMeInfo(@Request() req: any) {
    const userId = req.user.id;
    return await this.userService.findOneRequest(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 사용자 정보 조회',
    description: '특정 사용자의 정보를 조회합니다.',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: '사용자 정보 조회 성공',
  })
  async getUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.findOneRequest(userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '회원 탈퇴',
    description:
      '회원 탈퇴 API 입니다. 단, 영구적으로 삭제되지 않습니다. 탈퇴한 회원으로 변경됩니다.',
  })
  @ApiOkResponse({
    description: '회원 탈퇴 성공',
  })
  async deleteUser(
    @Param('id', ParseIntPipe) userId: number,
    @Request() req: any,
  ) {
    const myId = req.user.id;

    return await this.userService.delete(userId, myId);
  }
}
