import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorHandler } from 'src/utils/error.handler';

export type JwtPayload = {
  sub: string;
  username: string;
  name: string;
  email: string;
  role: string;
};

@Injectable()
export class JwtConstants {
  constructor(private readonly configService: ConfigService) {}

  get accessTokenSecret(): string {
    const secret = this.configService.get<string>('jwt.accessToken.secret');
    if (!secret) {
      throw ErrorHandler.newError({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Access token secret not found',
      });
    }
    return secret;
  }

  get accessTokenExpiresIn(): string {
    const expiresIn = this.configService.get<string>(
      'jwt.accessToken.expiresIn',
    );
    if (!expiresIn) {
      throw ErrorHandler.newError({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Access token expires in not found',
      });
    }
    return expiresIn;
  }

  get refreshTokenSecret(): string {
    const secret = this.configService.get<string>('jwt.refreshToken.secret');
    if (!secret) {
      throw ErrorHandler.newError({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Refresh token secret not found',
      });
    }
    return secret;
  }

  get refreshTokenExpiresIn(): string {
    const expiresIn = this.configService.get<string>(
      'jwt.refreshToken.expiresIn',
    );
    if (!expiresIn) {
      throw ErrorHandler.newError({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Refresh token expires in not found',
      });
    }
    return expiresIn;
  }
}
