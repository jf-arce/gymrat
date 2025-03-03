import { Prisma } from '@prisma/client';
import { GetRoutineDto } from '../dto/get-routine.dto';

export class RoutineMapper {
  static toGetDto(
    routineEntity: Prisma.RoutineGetPayload<{ include: { users: true } }>,
  ): GetRoutineDto {
    return {
      id: routineEntity.id,
      name: routineEntity.name,
      isCurrent: routineEntity.isCurrent,
      nextWorkout: routineEntity.nextWorkout,
      user: `${routineEntity.users.name} ${routineEntity.users.surname}`,
    };
  }

  static toArrayGetDto(
    routinesEntities: Prisma.RoutineGetPayload<{ include: { users: true } }>[],
  ): GetRoutineDto[] {
    return routinesEntities.map((routine) => RoutineMapper.toGetDto(routine));
  }
}
