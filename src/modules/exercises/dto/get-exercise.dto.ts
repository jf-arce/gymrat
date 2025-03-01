import { $Enums, Exercise } from '@prisma/client';

export class GetExerciseDto {
  id: number;
  name: string;
  muscleGroup: $Enums.MuscleGroupEnum;
  notes: string | null;
  image: string | null;

  constructor(exercise: Exercise) {
    this.id = exercise.id;
    this.name = exercise.name;
    this.muscleGroup = exercise.muscleGroup;
    this.notes = exercise.notes;
    this.image = exercise.image;
  }
}
