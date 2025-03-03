import { Body, Controller, Post, Req, Res } from '@nestjs/common';
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
  async login(@Res() res: Response, @Body() loginAuthDto: LoginAuthDto) {
    try {
      const authLogin = await this.authService.login(loginAuthDto);
      res.cookie('access_token', authLogin.accessToken, {
        httpOnly: true,
        secure: this.configService.get('nodeEnv') === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refresh_token', authLogin.refreshToken, {
        httpOnly: true,
        secure: this.configService.get('nodeEnv') === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        message: 'User logged in successfully',
        user: authLogin.user,
      });
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.status(200).json({
      message: 'User logged out successfully',
    });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const cookies = req.cookies as { [key: string]: string };
      const refreshToken = cookies['refresh_token'] || null;

      if (!refreshToken) {
        throw ErrorHandler.newError({
          type: 'UNAUTHORIZED',
          message: 'Refresh token not found',
        });
      }

      const newAccessToken = await this.authService.refreshToken(refreshToken);

      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: this.configService.get('nodeEnv') === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.status(200).json({
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
