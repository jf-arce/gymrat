import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
  @IsNotEmpty()
  @IsBoolean()
  isCurrent?: boolean;

  @IsNotEmpty()
  @IsInt()
  nextTraining?: number;
}
