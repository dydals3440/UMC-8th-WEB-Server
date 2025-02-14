import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserExistByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && !user.isDeleted) {
      throw new ConflictException(
        `해당 ${email} 이메일로 가입한 유저가 이미 존재합니다.`,
      );
    }
  }

  async checkUserExistById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException(
        `해당 ${userId}번 아이디에 해당하는 유저가 존재하지 않거나 이미 탈퇴한 유저입니다.`,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    await this.checkUserExistByEmail(createUserDto.email);

    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);

    return this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return user;
  }

  async findOneRequest(userId: number) {
    await this.checkUserExistById(userId);

    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: hashedRT },
    });
  }

  async delete(userId: number, myId: number) {
    await this.checkUserExistById(userId);

    if (userId !== myId) {
      throw new NotFoundException('반드시 본인의 계정만 탈퇴할 수 있습니다.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isDeleted: true,
        email: `deleted_${userId}@example.com`, // 중복 방지를 위해 이메일 변경
        name: '탈퇴한 회원',
        profileImageUrl: null,
        hashedRefreshToken: null, // 보안상 토큰 제거
        deletedAt: new Date(),
      },
    });

    return userId;
  }
}
