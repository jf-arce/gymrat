import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;

    const plainToHash = await bcrypt.hash(password, SALT_ROUNDS);
    registerAuthDto.password = plainToHash;

    await this.userService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email, username } = loginAuthDto;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'Credentials are incorrect',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'Credentials are incorrect',
      });
    }
  }
}
