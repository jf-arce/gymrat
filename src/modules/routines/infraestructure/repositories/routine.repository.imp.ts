import { Injectable } from 'src/modules/shared/dependency-injection/injectable';
import { RoutineRepository } from '../../domain/routine.repository';
import { Routine } from '../../domain/routine.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoutineRepositoryImp implements RoutineRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(routine: Routine): Promise<void> {
    await this.prisma.routine.create({
      data: {
        name: routine.getName(),
        isCurrent: routine.getIsCurrent(),
        nextTraining: routine.getNextTraining(),
        userId: routine.getUserId(),
      },
    });
  }

  async findAll(): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany();
    return routines.map(
      (routine) =>
        new Routine(
          routine.id,
          routine.name,
          routine.isCurrent,
          routine.nextTraining,
          routine.userId,
        ),
    );
  }

  async findOne(id: number): Promise<Routine | null> {
    const routine = await this.prisma.routine.findUnique({
      where: {
        id: id,
      },
    });
    if (!routine) return null;
    return new Routine(
      routine.id,
      routine.name,
      routine.isCurrent,
      routine.nextTraining,
      routine.userId,
    );
  }

  async update(routine: Routine): Promise<void> {
    await this.prisma.routine.update({
      where: {
        id: routine.getId(),
      },
      data: {
        name: routine.getName(),
        isCurrent: routine.getIsCurrent(),
        nextTraining: routine.getNextTraining(),
        userId: routine.getUserId(),
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.routine.delete({
      where: {
        id: id,
      },
    });
  }
}
