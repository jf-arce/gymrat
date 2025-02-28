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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'franp@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'fran87' })
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({ example: 'francisco12345' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty({ example: 'Francisco' })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  @Length(3, 50)
  surname: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  age: number;

  @ApiProperty({ example: 75 })
  @IsNumber()
  weightKg: number;

  @ApiProperty({ example: 175 })
  @IsInt()
  heightCm: number;

  @ApiProperty({ example: $Enums.UserSexEnum.HOMBRE })
  @IsEnum($Enums.UserSexEnum)
  sex: $Enums.UserSexEnum;

  @ApiProperty({ example: 'https://www.image.com', description: 'URL' })
  @IsOptional()
  @IsString()
  image: string | null;

  @ApiProperty({ example: 1 })
  @ApiProperty({ example: 1 })
  @IsInt()
  nationalityId: number;
}
