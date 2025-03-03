import { Prisma } from '@prisma/client';

export class GetWorkoutsExercise {
  id: number;
  rest: number;
  workout: Prisma.WorkoutGetPayload<{
    omit: {
      routineId: true;
    };
  }>;
  exerciseId: Prisma.ExerciseGetPayload<{
    omit: {
      userId: true;
    };
  }>;
}
