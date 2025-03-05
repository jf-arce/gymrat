import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  nextTraining?: number;
}
