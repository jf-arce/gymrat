import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserSex } from '../../domain/value-objects/user-sex';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  surname: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  weightKg: number;

  @IsInt()
  @IsNotEmpty()
  heightCm: number;

  @IsNotEmpty()
  @IsIn([UserSex.male().getValue(), UserSex.female().getValue()])
  sex: string;

  @IsOptional()
  @IsString()
  image: string | null;

  @IsInt()
  @IsNotEmpty()
  nationalityId: number;
}
