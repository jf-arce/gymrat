export type WorkoutExercises = {
  workouts: Workout;
  rest: number;
  exercises: Exercise;
  sets: Set[];
};

type Exercise = {
  id: number;
  name: string;
  muscleGroup: string;
  notes: null | string;
  image: string;
};

type Set = {
  number: number;
  weightKg: number;
  repetitions: number;
};

type Workout = {
  name: string;
};
