import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ErrorHandler } from 'src/utils/error.handler';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    try {
      await this.authService.register(registerAuthDto);
      return { message: 'User register successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      return await this.authService.login(loginAuthDto);
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.headers.authorization?.split(' ')[1];

      if (!refreshToken) {
        throw ErrorHandler.newError({
          type: 'UNAUTHORIZED',
          message: 'Refresh token not found',
        });
      }

      const newAccessToken = await this.authService.refreshToken(refreshToken);

      res.status(200).json({ newAccessToken });
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Get('verify-session')
  verifySession(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];

      if (!accessToken) {
        throw ErrorHandler.newError({
          type: 'UNAUTHORIZED',
          message: 'Access token not found',
        });
      }

      this.authService.verifySession(accessToken);
      return res.status(200).json({ message: 'Session is valid' });
    } catch (error) {
      console.log(error);
      throw ErrorHandler.throwError(error);
    }
  }
}
