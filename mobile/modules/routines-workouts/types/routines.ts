export type Routine = {
  id: number;
  name: string;
  isCurrent: boolean;
  nextWorkout: number;
  user: string;
};

export class RoutineClass {
  constructor(
    readonly id: number,
    name: string,
    isCurrent: boolean,
    nextWorkout: number,
    user: string,
  ) {}
}
