import { Nationality } from '@prisma/client';
import { CreateNationalityDto } from '../dto/create-nationality.dto';
import { UpdateNationalityDto } from '../dto/update-nationality.dto';
import { GetNationalityDto } from '../dto/get-nationality.dto';

export class NationalityMapper {
  static toCreateEntity(dto: CreateNationalityDto): Omit<Nationality, 'id'> {
    return {
      name: dto.name,
      flag: dto.flag,
    };
  }

  static toDto(entity: Nationality): GetNationalityDto {
    return {
      name: entity.name,
      flag: entity.flag,
    };
  }

  static toUpdateEntity(
    dto: UpdateNationalityDto,
  ): Partial<Omit<Nationality, 'id'>> {
    return {
      name: dto.name ?? undefined,
      flag: dto.flag ?? undefined,
    };
  }
}
