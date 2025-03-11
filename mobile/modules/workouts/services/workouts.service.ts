import { API_URL } from "@/constants/api";
import axios from "axios";
import { Workout } from "../types/workout.type";

export class WorkoutsService {
  static async findAllByRoutine(routineId: number): Promise<Workout[]> {
    try {
      const { data } = await axios.get(
        `${API_URL}/workouts/routine/${routineId}`,
      );

      return data as Workout[];
    } catch {
      return [];
    }
  }
}
