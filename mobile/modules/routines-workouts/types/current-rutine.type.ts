import { RoutineClass } from "./routines";
import { Workout } from "./workout.type";

export class CurrentRoutine extends RoutineClass {
  constructor(
    public workouts: Workout[],
    public id: number,
    public name: string,
    public isCurrent: boolean,
    public nextWorkout: number,
    public user: string,
  ) {
    super(id, name, isCurrent, nextWorkout, user);
  }

  getCurrentWorkout(): Workout | null {
    const currentWorkout = this.workouts.find(
      (workout) => workout.number === this.nextWorkout,
    );
    if (!currentWorkout) return null;
    return currentWorkout;
  }

  getNextWorkout(): Workout | null {
    const nextWorkout = this.workouts.find(
      (workout) => workout.number === this.nextWorkout + 1,
    );
    if (!nextWorkout) return null;
    return nextWorkout;
  }

  getPreviousWorkout(): Workout | null {
    const previousWorkout = this.workouts.find(
      (workout) => workout.number === this.nextWorkout - 1,
    );
    if (!previousWorkout) return null;
    return previousWorkout;
  }

  getWorkoutByNumber(workoutNumber: number): Workout | null {
    const workout = this.workouts.find(
      (workout) => workout.number === workoutNumber,
    );
    if (!workout) return null;
    return workout;
  }
}
