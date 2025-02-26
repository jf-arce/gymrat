import { PrismaClient } from '@prisma/client';
import { RankRepository } from '../../domain/rank.repository';
import { Rank } from '../../domain/rank.entity';
import { Injectable } from 'src/modules/shared/dependency-injection/injectable';

@Injectable()
export class RankRepositoryImp implements RankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(rank: Rank): Promise<void> {
    await this.prisma.rank.create({
      data: {
        number: rank.getNumber(),
        name: rank.getName(),
        required_xp: rank.getRequiredXp(),
        image: rank.getImage(),
      },
    });
  }
  async findAll(): Promise<Rank[]> {
    const ranksBd = await this.prisma.rank.findMany();
    return ranksBd.map(
      (rank) =>
        new Rank(rank.id, rank.number, rank.name, rank.required_xp, rank.image),
    );
  }
  async findOneById(id: number): Promise<Rank | null> {
    const rank = await this.prisma.rank.findUnique({
      where: {
        id,
      },
    });
    if (!rank) return null;
    return new Rank(
      rank.id,
      rank.number,
      rank.name,
      rank.required_xp,
      rank.image,
    );
  }
  async update(rank: Rank): Promise<void> {
    await this.prisma.rank.update({
      where: {
        id: rank.getId(),
      },
      data: {
        number: rank.getNumber(),
        name: rank.getName(),
        required_xp: rank.getRequiredXp(),
        image: rank.getImage(),
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.rank.delete({
      where: {
        id,
      },
    });
  }

  async findByNumber(number: number): Promise<Rank | null> {
    const rank = await this.prisma.rank.findUnique({
      where: {
        number,
      },
    });
    if (!rank) return null;

    return new Rank(
      rank.id,
      rank.number,
      rank.name,
      rank.required_xp,
      rank.image,
    );
  }
}
