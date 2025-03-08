import axios from "axios";
import { Routine } from "./routines";
import { API_URL } from "@/constants/api";

export class RoutinesService {
  async findAllByUser(userId: string): Promise<Routine[]> {
    const { data } = await axios.get(`${API_URL}/routines/user/${userId}`);
    return data as Routine[];
  }
}
