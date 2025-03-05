import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Press Banca' })
  @IsString()
  name: string;

  @ApiProperty({ example: $Enums.MuscleGroupEnum.PECHO })
  @IsEnum($Enums.MuscleGroupEnum)
  muscleGroup: $Enums.MuscleGroupEnum;

  @ApiProperty({ example: null })
  @IsOptional()
  @IsString()
  notes: string | null;

  @ApiProperty({ example: 'https://ejercicio.png' })
  @IsOptional()
  @IsUrl()
  image: string | null;

  @ApiProperty({ example: 'uuid' })
  @IsOptional()
  @IsString()
  userId: string | null;
}
