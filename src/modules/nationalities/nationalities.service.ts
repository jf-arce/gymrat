import { Injectable } from '@nestjs/common';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';
import { NationalityMapper } from './mapper/nationality.mapper';
import { GetNationalityDto } from './dto/get-nationality.dto';
import { Nationality } from '@prisma/client';

@Injectable()
export class NationalitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNationalityDto: CreateNationalityDto): Promise<void> {
    const nationality = await this.prisma.nationality.findUnique({
      where: { name: createNationalityDto.name },
    });
    if (nationality) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Nationality already exists',
      });
    }

    await this.prisma.nationality.create({
      data: NationalityMapper.toCreateEntity(createNationalityDto),
    });
  }

  async findAll(): Promise<GetNationalityDto[]> {
    const nationalities = await this.prisma.nationality.findMany();
    if (nationalities.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Nationalities not found',
      });
    }

    const nationalitiesDto = nationalities.map((nationality) => {
      return NationalityMapper.toDto(nationality);
    });

    return nationalitiesDto;
  }

  async findOne(name: string): Promise<GetNationalityDto> {
    const nationality = await this.findNationalityByName(name);

    return NationalityMapper.toDto(nationality);
  }

  async update(
    name: string,
    updateNationalityDto: UpdateNationalityDto,
  ): Promise<void> {
    await this.findNationalityByName(name);

    await this.prisma.nationality.update({
      where: { name },
      data: NationalityMapper.toUpdateEntity(updateNationalityDto),
    });
  }

  async remove(name: string) {
    await this.findNationalityByName(name);
  }

  private async findNationalityByName(name: string): Promise<Nationality> {
    const nationality = await this.prisma.nationality.findUnique({
      where: { name },
    });
    if (!nationality) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Nationality not found',
      });
    }
    return nationality;
  }
}
