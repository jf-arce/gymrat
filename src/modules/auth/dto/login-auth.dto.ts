import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ required: false })
  @ValidateIf((login: LoginAuthDto) => !login.username)
  @IsNotEmpty({ message: 'Email or username is required' })
  email?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({ required: false })
  @ValidateIf((login: LoginAuthDto) => !login.email)
  @IsNotEmpty({ message: 'Email or username is required' })
  username?: string;
}
