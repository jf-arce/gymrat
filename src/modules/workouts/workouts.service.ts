import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from '@prisma/client';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<void> {
    const routine = await this.prisma.routine.findUnique({
      where: { id: createWorkoutDto.routineId },
    });
    if (!routine) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Routine not found',
      });
    }

    const workout = await this.prisma.workout.findFirst({
      where: {
        number: createWorkoutDto.number,
        routineId: createWorkoutDto.routineId,
      },
    });
    if (workout) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Workout already exists in routine',
      });
    }

    await this.prisma.workout.create({
      data: {
        number: createWorkoutDto.number,
        name: createWorkoutDto.name,
        routineId: createWorkoutDto.routineId,
      },
    });
  }

  async findAll(): Promise<Workout[]> {
    const workouts = await this.prisma.workout.findMany();
    if (workouts.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No workouts found',
      });
    }

    return workouts;
  }

  async findOne(id: number): Promise<Workout> {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
    });
    if (!workout) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Workout not found',
      });
    }

    return workout;
  }

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    await this.prisma.workout.update({
      where: { id },
      data: updateWorkoutDto,
    });
  }

  async remove(id: number) {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
    });
    if (!workout) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Workout not found',
      });
    }

    return this.prisma.workout.delete({
      where: { id },
    });
  }
}
