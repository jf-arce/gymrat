import { Routine } from './routine.entity';

export abstract class RoutineRepository {
  abstract create(routine: Routine): Promise<void>;
  abstract findAll(): Promise<Routine[]>;
  abstract findOne(id: number): Promise<Routine | null>;
  abstract update(routine: Routine): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
