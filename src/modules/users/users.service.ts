import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { $Enums } from '@prisma/client';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExists) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'User already exists',
      });
    }

    const lowestRank = await this.prisma.rank.findUnique({
      where: {
        number: 1,
      },
    });
    if (!lowestRank) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Lowest rank not found',
      });
    }

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        id: randomUUID(),
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
    if (users.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No users found',
      });
    }

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
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

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
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return GetUserDto.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    if (updateUserDto.nationalityId) {
      const nationality = await this.prisma.nationality.findUnique({
        where: {
          id: updateUserDto.nationalityId,
        },
      });
      if (!nationality) {
        throw ErrorHandler.newError({
          type: 'NOT_FOUND',
          message: 'Nationality not found',
        });
      }
    }

    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
