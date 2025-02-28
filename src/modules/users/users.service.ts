import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { CustomError } from 'src/modules/shared/errors/custom-error';
import { $Enums } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExists) throw CustomError.badRequest('User already exists');

    const lowestRank = await this.prisma.rank.findUnique({
      where: {
        number: 1,
      },
    });
    if (!lowestRank) throw CustomError.notFound('Rank not found');

    await this.prisma.user.create({
      data: {
        id: randomUUID(),
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        surname: createUserDto.surname,
        age: createUserDto.age,
        weightKg: createUserDto.weightKg,
        heightCm: createUserDto.heightCm,
        sex: createUserDto.sex,
        image: createUserDto.image,
        nationalityId: createUserDto.nationalityId,
        rankId: lowestRank.id,
      },
    });
  }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: $Enums.UserRoleEnum.USER,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });
    if (users.length === 0) throw CustomError.notFound('Users not found');

    const usersDto = users.map((user) => {
      return GetUserDto.create(user);
    });
    return usersDto;
  }

  async findOneById(id: string): Promise<GetUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });
    if (!user) throw CustomError.notFound('User not found');
    return GetUserDto.create(user);
  }

  async findOneByEmail(email: string): Promise<GetUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        nationalities: true,
        ranks: true,
      },
    });
    if (!user) throw CustomError.notFound('User not found');
    return GetUserDto.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw CustomError.notFound('User not found');

    if (updateUserDto.nationalityId) {
      const nationality = await this.prisma.nationality.findUnique({
        where: {
          id: updateUserDto.nationalityId,
        },
      });
      if (!nationality) throw CustomError.notFound('Nationality not found');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        name: updateUserDto.name,
        surname: updateUserDto.surname,
        age: updateUserDto.age,
        weightKg: updateUserDto.weightKg,
        heightCm: updateUserDto.heightCm,
        sex: updateUserDto.sex,
        image: updateUserDto.image,
        nationalityId: updateUserDto.nationalityId,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: false, // Soft delete
      },
    });
  }
}
