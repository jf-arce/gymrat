import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
        name: user.getName(),
        surname: user.getSurname(),
        role: user.getRole().getValue(),
        age: user.getAge(),
        weight_kg: user.getWeightKg(),
        height_cm: user.getHeightCm(),
        sex: user.getSex().getValue(),
        xp: user.getXp(),
        image: user.getImage(),
        nationality_id: user.getNationality().getId(),
        rank_id: user.getRank().getId(),
      },
    });
  }

  async findAll(): Promise<User[]> {
    const usersDb = await this.prisma.user.findMany({
      include: {
        nationalities: true,
        ranks: true,
      },
    });

    const users = usersDb.map((user) => {
      return UserMapper.toDomain(user);
    });
    return users;
  }

  async findOneById(id: string): Promise<User | null> {
    const userDb = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });

    if (!userDb) return null;

    return UserMapper.toDomain(userDb);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userDb = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });

    if (!userDb) return null;

    return UserMapper.toDomain(userDb);
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.getId(),
      },
      data: {
        email: user.getEmail(),
        name: user.getName(),
        surname: user.getSurname(),
        role: user.getRole().getValue(),
        age: user.getAge(),
        weight_kg: user.getWeightKg(),
        height_cm: user.getHeightCm(),
        sex: user.getSex().getValue(),
        xp: user.getXp(),
        image: user.getImage(),
        nationality_id: user.getNationality().getId(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
