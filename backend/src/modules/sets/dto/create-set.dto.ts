import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateSetDto {
  @ApiProperty({
    example: 1,
    description: 'Set the number of the set in the exercise',
  })
  @IsInt()
  @IsPositive()
  number: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  weight_kg: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  repetitions: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  workoutExerciseId: number;
}
