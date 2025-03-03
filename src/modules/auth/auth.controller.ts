import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ErrorHandler } from 'src/utils/error.handler';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      await this.authService.login(loginAuthDto);
      return { message: 'User logged in successfully' };
    } catch (error) {
      throw ErrorHandler.throwError(error);
    }
  }
}
