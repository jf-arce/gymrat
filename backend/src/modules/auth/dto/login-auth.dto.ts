import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ required: false })
  @IsNotEmpty({ message: 'Email or username is required' })
  emailOrUsername?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
