import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { JwtConstants, JwtPayload } from './jwt/jwt.constants';
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly jwtConstants: JwtConstants,
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
      include: {
        nationalities: true,
        ranks: true,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'Credentials are incorrect',
      });
    }

    const userEntity = new UserEntity(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'Credentials are incorrect',
      });
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      name: userEntity.getFullName(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.jwtConstants.accessTokenSecret,
      expiresIn: this.jwtConstants.accessTokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.jwtConstants.refreshTokenSecret,
      expiresIn: this.jwtConstants.refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        role: user.role,
        id: user.id,
        name: userEntity.getFullName(),
        username: user.username,
        email: user.email,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const payloadDecoded = this.jwtService.verify<JwtPayload>(refreshToken, {
      secret: this.jwtConstants.refreshTokenSecret,
    });
    if (!payloadDecoded) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'Invalid token',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payloadDecoded.sub,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'UNAUTHORIZED',
        message: 'User not found',
      });
    }

    const userEntity = new UserEntity(user);

    const newPayload: JwtPayload = {
      sub: user.id,
      username: user.username,
      name: userEntity.getFullName(),
      email: user.email,
      role: user.role,
    };

    const newAccessToken = this.jwtService.sign(newPayload, {
      secret: this.jwtConstants.accessTokenSecret,
      expiresIn: this.jwtConstants.accessTokenExpiresIn,
    });

    return newAccessToken;
  }
}
