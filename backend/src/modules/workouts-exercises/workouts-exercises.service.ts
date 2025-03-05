import { Injectable } from '@nestjs/common';
import { CreateWorkoutsExerciseDto } from './dto/create-workouts-exercise.dto';
import { UpdateWorkoutsExerciseDto } from './dto/update-workouts-exercise.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class WorkoutsExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createWorkoutsExerciseDto: CreateWorkoutsExerciseDto,
  ): Promise<void> {
    const workoutId = await this.prisma.workout.findUnique({
      where: { id: createWorkoutsExerciseDto.workoutId },
    });
    if (!workoutId) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Workout not found',
      });
    }

    const exerciseId = await this.prisma.exercise.findUnique({
      where: { id: createWorkoutsExerciseDto.exerciseId },
    });
    if (!exerciseId) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Exercise not found',
      });
    }

    const exerciseInWorkout = await this.prisma.workoutExercise.findFirst({
      where: {
        workoutId: createWorkoutsExerciseDto.workoutId,
        exerciseId: createWorkoutsExerciseDto.exerciseId,
      },
    });
    if (exerciseInWorkout) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Exercise already exists in this workout',
      });
    }

    await this.prisma.workoutExercise.create({
      data: {
        rest: createWorkoutsExerciseDto.rest,
        workoutId: createWorkoutsExerciseDto.workoutId,
        exerciseId: createWorkoutsExerciseDto.exerciseId,
      },
    });
  }

  findAll() {
    return `This action returns all workoutsExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutsExercise`;
  }

  async findExercisesByWorkout(workoutId: number) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
    });
    if (!workout) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Workout not found',
      });
    }

    const workoutExercises = this.prisma.workoutExercise.findMany({
      where: {
        workoutId,
      },
      omit: {
        exerciseId: true,
        workoutId: true,
      },
      include: {
        exercises: {
          omit: {
            userId: true,
          },
        },
        sets: {
          omit: {
            id: true,
            workoutExerciseId: true,
          },
        },
      },
    });

    return workoutExercises;
  }

  async update(
    id: number,
    updateWorkoutsExerciseDto: UpdateWorkoutsExerciseDto,
  ) {
    await this.prisma.workoutExercise.update({
      where: { id },
      data: updateWorkoutsExerciseDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} workoutsExercise`;
  }
}
