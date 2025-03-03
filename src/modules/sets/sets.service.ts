import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ErrorHandler } from 'src/utils/error.handler';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class SetsService {
  constructor(private prisma: PrismaService) {}

  async create(createSetDto: CreateSetDto) {
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id: createSetDto.workoutExerciseId },
    });
    if (!workoutExercise) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Workout exercise not found',
      });
    }

    const set = await this.prisma.set.findFirst({
      where: {
        number: createSetDto.number,
        workoutExerciseId: createSetDto.workoutExerciseId,
      },
    });
    if (set) {
      throw ErrorHandler.newError({
        type: 'CONFLICT',
        message: 'Set already exists',
      });
    }

    await this.prisma.set.create({
      data: {
        number: createSetDto.number,
        weightKg: createSetDto.weight_kg,
        repetitions: createSetDto.repetitions,
        workoutExerciseId: createSetDto.workoutExerciseId,
      },
    });
  }

  findAll() {
    return `This action returns all sets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} set`;
  }

  async update(id: number, updateSetDto: UpdateSetDto) {
    const set = await this.prisma.set.findUnique({
      where: { id },
    });
    if (!set) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Set not found',
      });
    }

    await this.prisma.set.update({
      where: { id },
      data: {
        number: updateSetDto.number,
        weightKg: updateSetDto.weight_kg,
        repetitions: updateSetDto.repetitions,
      },
    });
  }

  async remove(id: number) {
    const set = await this.prisma.set.findUnique({
      where: { id },
    });
    if (!set) {
      throw ErrorHandler.newError({
        type: 'NOT_FOUND',
        message: 'Set not found',
      });
    }

    await this.prisma.set.delete({
      where: { id },
    });
  }
}
