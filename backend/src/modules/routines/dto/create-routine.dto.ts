import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoutineDto {
  @ApiProperty({ example: 'Tren superior' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsBoolean()
  isCurrent: boolean;
}
