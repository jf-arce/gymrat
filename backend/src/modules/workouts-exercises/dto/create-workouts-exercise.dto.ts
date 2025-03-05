import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateWorkoutsExerciseDto {
  @ApiProperty({ example: 60, description: 'Rest time in seconds' })
  @IsInt()
  rest: number;

  @ApiProperty()
  @IsInt()
  workoutId: number;

  @ApiProperty()
  @IsInt()
  exerciseId: number;
}
