import { Exercise } from '@prisma/client';
import { GetExerciseDto } from '../dto/get-exercise.dto';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

export class ExerciseMapper {
  static toGetDto(exercise: Exercise): GetExerciseDto {
    return new GetExerciseDto(exercise);
  }

  static toArrayGetDto(exercises: Exercise[]): GetExerciseDto[] {
    return exercises.map((exercise) => ExerciseMapper.toGetDto(exercise));
  }

  static toCreateEntity(
    createExerciseDto: CreateExerciseDto,
  ): Omit<Exercise, 'id'> {
    return {
      name: createExerciseDto.name,
      muscleGroup: createExerciseDto.muscleGroup,
      notes: createExerciseDto.notes ?? null,
      image: createExerciseDto.image ?? null,
      userId: createExerciseDto.userId ?? null,
    };
  }

  static toUpdateEntity(
    createExerciseDto: UpdateExerciseDto,
  ): Partial<Exercise> {
    return {
      name: createExerciseDto.name ?? undefined,
      muscleGroup: createExerciseDto.muscleGroup ?? undefined,
      notes: createExerciseDto.notes ?? undefined,
      image: createExerciseDto.image ?? undefined,
    };
  }
}
