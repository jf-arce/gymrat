import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  username: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsInt()
  age: number;

  @IsNumber()
  weightKg: number;

  @IsInt()
  heightCm: number;

  @IsEnum($Enums.UserSexEnum)
  sex: $Enums.UserSexEnum;

  @IsOptional()
  @IsString()
  image: string | null;

  @IsInt()
  nationalityId: number;
}
