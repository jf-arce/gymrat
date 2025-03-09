import axios from "axios";
import { Routine } from "../types/routines";
import { API_URL } from "@/constants/api";

export class RoutinesService {
  static async findAllByUser(userId: string): Promise<Routine[]> {
    try {
      const { data } = await axios.get(`${API_URL}/routines/user/${userId}`);

      return data as Routine[];
    } catch {
      return [];
    }
  }
}
