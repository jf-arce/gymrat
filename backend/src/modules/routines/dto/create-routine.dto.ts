import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoutineDto {
  @ApiProperty({ example: 'Tren superior' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
