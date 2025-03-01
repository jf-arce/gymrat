import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @ApiProperty({
    example: 1,
    description: 'The number of the workouts to be done in the routine',
  })
  @IsInt()
  number: number;

  // Tren superior
  @ApiProperty({
    example: 'Upper Body',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the routine to which the workout belongs',
  })
  @IsInt()
  routineId: number;
}
