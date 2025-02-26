import { PrismaClient } from '@prisma/client';
import { Nationality } from '../../domain/nationality.entity';
import { NationalityRepository } from '../../domain/nationality.repository';
import { Injectable } from 'src/modules/shared/dependency-injection/injectable';

@Injectable()
export class NationalityRepositoryImp implements NationalityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(nationality: Nationality): Promise<void> {
    await this.prisma.nationality.create({
      data: {
        name: nationality.getName(),
        flag: nationality.getFlag(),
      },
    });
  }
  async findAll(): Promise<Nationality[]> {
    const nationalitiesBd = await this.prisma.nationality.findMany();
    return nationalitiesBd.map(
      (national) => new Nationality(national.id, national.name, national.flag),
    );
  }
  async findOneById(id: number): Promise<Nationality | null> {
    const nationalityBd = await this.prisma.nationality.findUnique({
      where: {
        id,
      },
    });
    if (!nationalityBd) return null;

    return new Nationality(
      nationalityBd.id,
      nationalityBd.name,
      nationalityBd.flag,
    );
  }
  async update(nationality: Nationality): Promise<void> {
    await this.prisma.nationality.update({
      where: {
        id: nationality.getId(),
      },
      data: {
        name: nationality.getName(),
        flag: nationality.getFlag(),
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prisma.nationality.delete({
      where: {
        id,
      },
    });
  }
}
