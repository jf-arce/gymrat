import { API_URL } from "@/constants/api";
import axios from "axios";

export class WorkoutExercisesService {
  static async findExercisesByWorkoutId(workoutId: number) {
    try {
      const { data } = await axios.get(
        `${API_URL}/workouts-exercises/workout/${workoutId}`,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
