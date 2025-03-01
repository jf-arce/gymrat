import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNationalityDto {
  @ApiProperty({ example: 'Argentina' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://arg.svg',
    description: 'Flag URL',
  })
  @IsOptional()
  @IsString()
  flag: string | null;
}
