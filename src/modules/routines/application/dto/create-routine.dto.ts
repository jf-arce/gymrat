import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
