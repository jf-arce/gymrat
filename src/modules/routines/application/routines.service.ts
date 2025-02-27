import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { UserRepository } from 'src/modules/users/domain/user.repository';
import { CustomError } from 'src/modules/shared/errors/custom-error';
import { Routine } from '../domain/routine.entity';
import { RoutineRepository } from '../domain/routine.repository';

@Injectable()
export class RoutinesService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createRoutineDto: CreateRoutineDto): Promise<void> {
    const user = await this.userRepository.findOneById(createRoutineDto.userId);
    if (!user) throw CustomError.notFound('User not found');

    const newRoutine = new Routine(
      0,
      createRoutineDto.name,
      false, // isCurrent
      1, // nextTraining
      createRoutineDto.userId,
    );

    await this.routineRepository.create(newRoutine);
  }

  async findAll(): Promise<Routine[]> {
    const routines = await this.routineRepository.findAll();
    if (routines.length === 0) throw CustomError.notFound('Routines not found');
    return routines;
  }

  async findOne(id: number): Promise<Routine> {
    const routine = await this.routineRepository.findOne(id);
    if (!routine) throw CustomError.notFound('Routine not found');
    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<void> {
    const routine = await this.routineRepository.findOne(id);
    if (!routine) throw CustomError.notFound('Routine not found');

    routine.setName(updateRoutineDto.name || routine.getName());
    routine.setIsCurrent(updateRoutineDto.isCurrent || routine.getIsCurrent());
    routine.setNextTraining(
      updateRoutineDto.nextTraining || routine.getNextTraining(),
    );

    await this.routineRepository.update(routine);
  }

  remove(id: number): Promise<void> {
    return this.routineRepository.remove(id);
  }
}
