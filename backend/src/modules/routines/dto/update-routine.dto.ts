import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  nextWorkout?: number;
}
