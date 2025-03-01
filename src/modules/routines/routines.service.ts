import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { Routine } from '@prisma/client';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class RoutinesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoutineDto: CreateRoutineDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: createRoutineDto.userId,
      },
    });
    if (!user) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    const routine = await this.prisma.routine.findFirst({
      where: {
        userId: createRoutineDto.userId,
        name: createRoutineDto.name,
      },
    });
    if (routine) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Routine already exists',
      });
    }

    await this.prisma.routine.create({
      data: {
        name: createRoutineDto.name,
        isCurrent: false,
        nextWorkout: 1,
        userId: createRoutineDto.userId,
      },
    });
  }

  async findAll(): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany();
    if (routines.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No routines found',
      });
    }

    return routines;
  }

  async findAllByUser(userId: string): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany({
      where: {
        userId,
      },
    });
    if (routines.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No routines found',
      });
    }

    return routines;
  }

  async findOne(id: number): Promise<Routine> {
    const routine = await this.prisma.routine.findUnique({
      where: {
        id,
      },
    });
    if (!routine) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Routine not found',
      });
    }

    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<void> {
    const routine = await this.prisma.routine.findUnique({
      where: {
        id,
      },
    });
    if (!routine) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Routine not found',
      });
    }

    await this.prisma.routine.update({
      where: {
        id,
      },
      data: {
        name: updateRoutineDto.name,
        isCurrent: updateRoutineDto.isCurrent,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const routine = await this.prisma.routine.findUnique({
      where: {
        id,
      },
    });
    if (!routine) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Routine not found',
      });
    }

    await this.prisma.routine.delete({
      where: {
        id,
      },
    });
  }
}
