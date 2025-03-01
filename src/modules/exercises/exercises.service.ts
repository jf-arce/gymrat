import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';
import { ExerciseMapper } from './mapper/exercise.mapper';
import { GetExerciseDto } from './dto/get-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<void> {
    if (createExerciseDto.userId) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: createExerciseDto.userId,
        },
      });
      if (!user) {
        throw ErrorHandler.newError({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }
    }

    const exercise = await this.prisma.exercise.findFirst({
      where: {
        name: createExerciseDto.name,
      },
    });
    if (exercise) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Exercise already exists',
      });
    }

    await this.prisma.exercise.create({
      data: ExerciseMapper.toCreateEntity(createExerciseDto),
    });
  }

  async findAll(): Promise<GetExerciseDto[]> {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        userId: null,
      },
    });
    if (exercises.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No exercises found',
      });
    }

    return ExerciseMapper.toArrayGetDto(exercises);
  }

  async findAllByUser(userId: string): Promise<GetExerciseDto[]> {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        userId,
      },
    });
    if (exercises.length === 0) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'No exercises found',
      });
    }

    return ExerciseMapper.toArrayGetDto(exercises);
  }

  async findOne(id: number): Promise<GetExerciseDto> {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    });
    if (!exercise) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Exercise not found',
      });
    }

    return ExerciseMapper.toGetDto(exercise);
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<void> {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    });
    if (!exercise) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Exercise not found',
      });
    }

    await this.prisma.exercise.update({
      where: {
        id,
      },
      data: ExerciseMapper.toUpdateEntity(updateExerciseDto),
    });
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    });
    if (!exercise) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Exercise not found',
      });
    }

    await this.prisma.exercise.delete({
      where: {
        id,
      },
    });
  }
}
